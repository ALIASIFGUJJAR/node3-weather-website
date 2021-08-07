const request= require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWxpMzMyNCIsImEiOiJja3BzZnB0OW4wMzNmMnZvYWxkcWRlMHc5In0.PXo5nnA5yK9-nFUETjKYMQ'
    request({url,json: true},(error,{body})=>{
              if(error){
    callback('please provide valid address',undefined)
                            }
else if(body.features.length === 0){
callback('unable to find location',undefined)
}else{
callback(undefined,{
    latitude: body.features[0].center[1],
    longitude: body.features[0].center[0],
    location: body.features[0].place_name
})
}
    })
}

// geocode('kasecbadshahi',(error,data)=>{
//     if(error){
//         return console.log('error:',error)  
//     }else{
//         console.log(data)
//     }
// })
module.exports = geocode