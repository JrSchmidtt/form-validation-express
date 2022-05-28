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
    var email = req.flash('email');
    var name = req.flash('name');
    var cpf = req.flash('cpf');

    var emailError = req.flash('emailError');
    var nameError = req.flash('nameError');
    var cpfError = req.flash('cpfError');

    email = (email == undefined || email.length == 0) ? undefined : email;
    name = (name == undefined || name.length == 0) ? undefined : name;
    cpf = (cpf == undefined || cpf.length == 0) ? undefined : cpf;

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError;
    cpfError = (cpfError == undefined || cpfError.length == 0) ? undefined : cpfError;

    res.render('index',{email:email,name:name,cpf:cpf,emailError,nameError,cpfError});
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
        req.flash("emailError",emailError);
        req.flash("nameError",nameError);
        req.flash("cpfError",cpfError);

        req.flash('email', email);
        req.flash('name', name);
        req.flash('cpf', cpf);

        res.redirect('/');
    }else{
        res.send('Submitted form');
        res.redirect('/')
    }
})

app.listen(8080,(req,res)=>{
    console.log('Server Running..');
})