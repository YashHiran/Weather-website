const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

//Define paths for Express config
const mypath = path.join(__dirname, '../public');
const viewsPath = path.join('__dirname', '../templates/views');
const partialsPath = path.join('__dirname', '../templates/partials');

//setup handelbars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set up static directory to serve  
app.use(express.static(mypath));

app.get('', (req, res)=>{
    res.render('index',{
        title :  'Weather App',
        name : 'Yash Hiran'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About me',
        name : 'Yash Hiran',
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpContent : 'This is my helping text',
        title : 'Help',
        name :  'Yash Hiran'
    });
})

app.get('/weather', (req,res) =>{

    if(!req.query.address){
        return res.send({
            error : 'You must provide location!!'
        });
    }

    geoCode(req.query.address,(error, data)=>{
        if(error){
            return res.send({error});
        }
            forecast(data.lattitude, data.longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error});
                }
                res.send({
                    forecast : forecastData,
                    location : data.location,
                    address : req.query.address
                })

            })
    })

    // res.send({
    //     forecast : 'It is snowing',
    //     location :  'shrirampur'
    // })
}) 


app.get('/products', (req, res)=>{
    
    if(!req.query.search){
        return res.send("You must provide a search term!!");
    } 
    res.send({
        products : []
    })
})

app.get('*',(req, res)=>{
    res.send("<h1>My 404 page<h1>");   
}) 
 
app.listen(port, ()=>{
    console.log('Server is ON on port ' + port);
})