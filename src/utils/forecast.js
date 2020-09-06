const request = require('request')

forecast=(long,lat,callback)=>{

    const url='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&lang=en&appid=216315805556cc57f97d321b099e527e&units=metric'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the weather service.',undefined)
        }else if(body.weather.length===0){
            callback('unable to find the location.Try another search',undefined)
        }else{
            data={
                temp:body.main.temp,
                desc:body.weather[0].description
            }

            callback(undefined,data)
        }

    })
}

module.exports=forecast