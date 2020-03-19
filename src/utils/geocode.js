
const request = require('request')

const geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaC0xMjMiLCJhIjoiY2s3dWk0Y2o0MHlsdTNsbjFtaG5lYmpwZCJ9.H-SieIWMeASxilPjgYh0Yw';

    request({url : url, json : true}, (error, response)=>{
        if(error){
            callback('Unable to connect to Internet!!', undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location.Try another search!!',undefined);
        }else{
                callback(undefined, {
                    lattitude : response.body.features[0].center[1],
                    longitude : response.body.features[0].center[0],
                    location : response.body.features[0].place_name
                }); 
        }
    })
}
module.exports = geoCode;