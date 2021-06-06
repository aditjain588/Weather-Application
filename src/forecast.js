const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=586243f8b5e76bc8993e3e16e2ddfac5&query=' + latitude + ',' + longitude
    request({url: url, json: true},(err, response) => {
        if(err){
            callback('Unable to connect',undefined);
        }
        else if(response.body.error){
            callback('Unable to connect to api', undefined);
        }
        else{

            callback(undefined, response.body.current.temperature)
        }
    })
}

module.exports = forecast;