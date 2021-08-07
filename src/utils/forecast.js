const request=require('request')

const forecast=(lon,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c29773320c433064a097cb5d981a93ba&query='+lon+','+lat+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('not connected to net',undefined)
        }else if(body.error){
                callback('try another location',undefined)
        }else{
            callback(undefined, 'the crrently temprature of '+body.location.name+' is:'+body.current.temperature+'f')

        }

    })
}



module.exports=forecast