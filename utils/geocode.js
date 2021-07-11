 const request = require('request');

 const geocode = (address, callback) => {

     const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW51ZGVlcGVydWt1bGxhIiwiYSI6ImNrcWZjeWI5cjF0OWQyc3F0aGpzeDhzanQifQ.hvzLqHHFK7K7z5jEGV8vmQ`;

     request({
         url: geocodingUrl,
         json: true
     }, async (error, response) => {
         if(error ){
            await  callback(error, '');
         }
         if (response.body.features && response.body.features[0]) {
             const body = {coord:response.body.features[0].geometry.coordinates,
                place:response.body.features[0].place_name};
             console.log("body:", body);
            await  callback(error, body);
             
         } else {
             callback("Please provide valid location",'');
         }
     });

 };

 module.exports = geocode;