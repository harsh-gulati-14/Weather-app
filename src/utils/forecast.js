const request =require('request');
// we are just using like a making a function and providing value to it to print the output
// callback is nothing same like getting a return value from the function called
// from the main app.js
const forecast=(a,b,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d2fdbcc5860ea0dc38cf3adeb2c0b27f&query='+ a +','+ b +'&units=f'
    request({url:url, json:true},(error,response)=>{
        // this is the representation of the http request from the server api
        // there may be the cases that error occured so that can also be resolved
        if(error)
        {  // this the error handling case when the internet is not working
            callback('UNABLE to connect to the SERVER',undefined);
        }
        else if(response.body.error)
        { // when a wrong input or a input that is not in the json input
            callback('WRONG INPUT TRY SOMETHING ELSE',undefined);       
        }
        else{ // if everythig remains good go for this
            callback(undefined,
                'It is currently '+ response.body.current.temperature +'F But it feels like '+ response.body.current.feelslike+'F'
            )
        }
    })
}
module.exports=forecast