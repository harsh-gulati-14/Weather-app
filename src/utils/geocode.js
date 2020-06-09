const request =require('request');
// we are just using like a making a function and providing value to it to print the output
// callback is nothing same like getting a return value from the function called
// from the main app.js
const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyc2hndWxhdGkiLCJhIjoiY2s4ZWUyMjR5MTVnODNmcGV3aGFrYjVsZiJ9.EISmD6or5bdZl0FlpecbOA';
    request({url:url, json:true},(error,response)=>{
        // this is the representation of the http request from the server api
        // there may be the cases that error occured so that can also be resolved
        if(error)
        {  // this the error handling case when the internet is not working
            callback('UNABLE to connect to the SERVER',undefined);
        }
        else if(response.body.features.length==0)
        { // when a wrong input or a input that is not in the json input
            callback('WRONG INPUT TRY SOMETHING ELSE',undefined);       
        }
        else{ // if everythig remains good go for this
            callback(undefined,{
                lat:response.body.features[0].center[1],
                lon:response.body.features[0].center[0],
                loc:response.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode