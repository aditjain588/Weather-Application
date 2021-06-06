const geocode = require('./geocode');
const forecast = require('./forecast');
const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express()

//console.log(path.join(__dirname, '../public'))

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, '../partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (err, data={}) => {
        if(err){
            return res.send({err});
        }
        forecast(data.latitude, data.longitude, (err, forcastData) => {
           console.log(data);
            if(err){
                return res.send({err});
            }
            res.send({
                forecast: forcastData,
                address: req.query.address,
                location: data.location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render("notFound", {
        title: '404',
        msg: '404 error page noy found'
    })
})

app.listen(3000, () => {
    console.log("Started server port 3000");
})