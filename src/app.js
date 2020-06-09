const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
/*console.log(__dirname) // it gives the directory where the file is placed
console.log(path.join(__dirname,'../public')) // now this is just replicant of __filename and that
// ../.. is a way to traverse between different file in that same directory and where the filr is saved
*/
// to set up directory path for public and templates part to configure express
const publicdirec=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
// set up hbs extension and viewpath way to excess template location
app.set('view engine','hbs') // this is used to set up hbs-- handlebar extension
// it is used for setting up the dynamic template extension and to provide dynamic content/render content to the page
app.set('views',viewpath);
hbs.registerPartials(partialpath);
//  setup static directory path
app.use(express.static(publicdirec))// app.use just customize the folder
app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER APP',       // now this is the way of setting up JSON objects or javascript objects to the webpage
        name:'HARSH'
    })
                                 // so hbs is not able to directly access from th web page so we need to setup a route
})  
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',name:'HARSH'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP SECTION',name:'HARSH'

    })
}) 
// this is the basic prototype of getting a address in the form of JSON from a query string       
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'YOU MUST HAVE PROVIDED THE ADDRESS'
        })
    }
    geocode(req.query.address,(error,{lat,lon,loc}={})=>{

        if(error)
        {
            return res.send({error})
        }
        forecast(lat,lon,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                loc,
                address:req.query.address
            })
        })
    })
})
// 404 page route should be last                    
// express will look up the order
//'*' means about that if nothing match just print the 404 page 
app.get('/help/*',(req,res)=>{
    res.render('404help')
})
app.get('*',(req,res)=>{
        res.render('404')
})

  // in this render keyword is used
/*app.get('',(req,res)=>{
    res.send('HARSH GULATI')        
}) // after using that public directory path these thing will never run
app.get('/help',(req,res)=>{ //same like a serving up different pages
    res.send([{
            name: 'HARSH'
        },{
            name: 'GULATI'
        }
    ])
})*/
app.listen(3000,()=>{
    console.log("SERVER IS UP");
})

