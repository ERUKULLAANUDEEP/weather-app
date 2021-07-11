const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const app = express();

const viewsPath = path.join(__dirname,'./public/templating/views');
const partialsPath = path.join(__dirname,'./public/templating/partials' );
const jspath = path.join(__dirname,'./public/');
const images = path.join(__dirname,'/public/images');
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
//Serving up static files
app.use(express.static(path.join(__dirname,'./public/index.html')));
app.use(express.static(jspath));
app.use(express.static(images));
app.get('', (req, res) => {
  res.render('index',{
      created:'Anudeep',
      title:'Weather'
  });
});

app.use('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        created:'Anudeep'
    });
});


app.use('/about',(req,res)=>{
    res.render('help',{
        title:'about page',
        created:'Anudeep'
    });
});


app.get('/weather',(req, res)=>{
    if(!req.query.location){
        return res.send({
            error:'Please provide the location address'
        });
    }
    console.log(req.query);
     geocode( req.query.location, (err,data)=>{
         if(err){
             res.send({
                 description: 'Please enter valid location'
             });
         }
        forecast(err, data,(err, desc)=>{
            res.send({
                forecast:req.query.location,
                location:data ,
                description: desc,
                place: data.place
            })
        });
    });
    
});

app.get('/help/*',(req,res)=>{
    res.send('help resdource nor found');
})

// app.get('*',(req,res) => {
//     res.render('notfound');
// })
app.listen('3000',() => {
    console.log('Server is up on port 3000');
});