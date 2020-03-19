const request = require('request');

const forecast = (lattitude, longitude, callback)=>{
    const url ='https://api.darksky.net/forecast/94a3018129937c5a05aaef8d9144d9ac/'+ lattitude+','+longitude+'?lang=en';

    request({url  : url, json : true}, (error, response)=>{
        if(error){
               callback('Unable to connect to weather service', undefined);  
        }else if(response.body.error){
                callback("Error getting data!!");
        }else{
            callback(undefined,response.body.daily.data[0].summary)
        }
    })
}
module.exports= forecast;