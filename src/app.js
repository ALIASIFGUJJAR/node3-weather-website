const path=require('path')
const express=require('express')



const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define Path for exprees Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partilasPath=path.join(__dirname,'../templates/partials')


//Setup Static Directory to Server
app.use(express.static(publicDirectoryPath))

//setup handles bar location and viewengine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partilasPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
        name:"Ali Asif"

    })
})

app.get('/About',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Ali Asif"

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpmessage:'this is dynamic page',
        title:'help Page',
        name:'Ali Asif'

    })
})



app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'You must provide an address in query'
        })
    }

   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })


        })
        
   })


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormessage:'help article not found',
        name: 'Ali Gujjar'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormessage:'Page not Found',
        name: 'Ali Gujjar'
    })
})

app.listen(port,()=>{
    console.log('server is up on ' +port);
})
