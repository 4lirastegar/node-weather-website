const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()
const port = process.env.PORT || 3000

const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name: "Ali Rastegar"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:'about me',
        name:'Ali Rastegar',
        job: 'Node js Developer',
        age:22,
        nationality:"iranian",
        major:"software engineer"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:'help',
        pageTitle:"weather app",
        name:"ali rastegar",
        email:"4lirastegar4li@gmail.com"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please Provide An Address'
        })
    }
        geocode(req.query.address,(error,{latitude,longtitude,name}={error})=>{
            if(error){
                return res.send({error})
            }
            forecast(longtitude,latitude,(error,{temp,desc})=>{
                if(error){
                 return  res.send({error})
                }
                res.send({
                        name:name,
                        temp:temp,
                        desc:desc
                })
            })
         })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        message:'help article not found',
        name:'ali rastegar'
    })
})
app.get('*',(req,res)=>{
  res.render('404',{
      title:"404 ",
      message:'page not found',
      name:'ali rastegar'

  })
})
app.listen(port,()=>{
    console.log("server is up on port "+ port)
})
