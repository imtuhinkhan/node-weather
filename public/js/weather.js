const weatherForm  = document.querySelector('form')
const submitElement  = document.querySelector('input')

const messageOne = document.querySelector('#loc')
const deg = document.querySelector('#temp')
const sum = document.querySelector('#sum')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    deg.textContent='Loading..........'
    sum.textContent='Loading..........'
    messageOne.textContent='Loading..........'
    const location = submitElement.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            messageOne.textContent=data.location
            deg.textContent=data.response.currently.temperature
            sum.textContent=data.text
        }
        else{
            messageOne.textContent=data.error
            deg.textContent=0
            sum.textContent=data.error
        }
    })
})
})