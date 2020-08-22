const path = require('path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../views/partials')

app.use(express.static(publicPath))
hbs.registerPartials(partialPath);
app.set('view engine','hbs')
app.get('',(req,res)=>{
    res.render('index', {
        title:'MR. Weather'
    });
})

app.get('/news',(req,res)=>{
    res.render('news', {
        title:'News'
    });
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About'
    });
})

app.get('/photo',(req,res)=>{
    res.render('photos', {
        title:'Photo'
    });
})

app.get('/contact',(req,res)=>{
    res.render('contact', {
        title:'Contact'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(({
            error:'you must provide a search term'
        }))
    }
    const country = req.query.address
    geocode(country,(error,{latitute,longtitute,location} = {})=>{
        if(!error){
            forecast(latitute,longtitute,(error,body)=>{
                res.send({
                    response:body,
                    location,
                    address: req.query.address,
                    text:body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + Math.ceil(body.currently.precipProbability*100) + '% chance of rain.'
        
                })
            })
        }
        else res.send({
            error
        })
    })
    
})

app.get('*',(req,res)=>{
    res.render('index', {
        title:'404'
    });
})

app.listen(port,()=>{
    console.log('Server Up'+ port);
})