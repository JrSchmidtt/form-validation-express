var express = require('express');
var bodyParser = require('body-parser');
var cookieParser =require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser('4FZVFrlfgIqyfp9NaVtt'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash());

app.get('/',(req, res)=> {
    res.render('index');
})

app.post('/form',(req,res)=>{
    var { email, name, cpf} = req.body;

    var emailError;
    var nameError;
    var cpfError;

    if (email == undefined || email ==''){
        emailError = 'EMAIL is not valid';
    }

    if(name == undefined || name =='' || name.length < 3 ){
        nameError = 'NAME is not valid';
    }

    if (cpf == undefined || cpf.length < 11 ){
        cpfError = 'CPF is not valid';
    }

    if(emailError!= undefined || nameError!= undefined || cpfError != undefined){
        res.send('Check the fields typed correctly')
        res.redirect('/')
    }else{
        res.send('Submitted form');
        res.redirect('/')
    }
})

app.listen(8080,(req,res)=>{
    console.log('Servidor Rondando!');
})