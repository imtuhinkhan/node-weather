const request = require('request')

const forecast = (lat,long,callback)=>{
const url = 'https://api.darksky.net/forecast/257e76d291f7b17062fff57fc2c7a00b/'+lat+','+long+'?units=si'

    request({url, json:true},(error, { body })=>{        
        if(!error){
            callback(undefined,body)
        }else{
            callback('error found',undefined)
        }
    })
}

module.exports = forecast