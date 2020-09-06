const request=require('request')

geocode=(address,callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiNGxpcmFzdGVnYXIiLCJhIjoiY2tkZGFreHU0MW9uODJycGNtb3Awb29kayJ9.EbWoPlAhO3ShuY1u0KFinQ"
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services.',undefined)
        }else if(body.features.length===0){
            callback('unable to find location . Try another location.',undefined)
        }else{
            data={
               longtitude:body.features[0].center[0],
               latitude:body.features[0].center[1],
               name:body.features[0].place_name
            }
            callback(undefined,data)

        }

    })


}
module.exports= geocode