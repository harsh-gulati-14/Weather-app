const express=require('express')
const path=require('path')
const app=express()

/*console.log(__dirname) // it gives the directory where the file is placed
console.log(path.join(__dirname,'../public')) // now this is just replicant of __filename and that
// ../.. is a way to traverse between different file in that same directory and where the filr is saved
*/
// to set up directory path for public and templates part to configure express
const publicdirec=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates')
// set up hbs extension and viewpath way to excess template location
app.set('view engine','hbs') // this is used to set up hbs-- handlebar extension
// it is used for setting up the dynamic template extension and to provide dynamic content/render content to the page
app.set('views',viewpath);
//  setup static directory path
app.use(express.static(publicdirec))// app.use just customize the folder
app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER APP'       // now this is the way of setting up JSON objects or javascript objects to the webpage
    })
                                 // so hbs is not able to directly access from th web page so we need to setup a route
})                                  // in this render keyword is used
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

