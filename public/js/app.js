
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
 
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.err){
            messageOne.textContent = "Unable to get location! Try another search"
        }
        else{
 
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})

})