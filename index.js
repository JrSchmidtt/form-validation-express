var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());


app.get('/',(req, res)=> {
    res.render('index');
})

app.listen(8080,(req,res)=>{
    console.log('Servidor Rondando!');
})