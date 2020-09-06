console.log("Client side javascript file is loaded")

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)

    })
})

const weatherForm =document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
         }else{
            const locationName=JSON.stringify(data.name)
            const temp=JSON.stringify(data.temp)
            const des=JSON.stringify(data.desc)
            messageTwo.textContent='Location: '+locationName + 'Forecast: ' +des+'\n temprature: '+temp
         }
    })
})
    
})