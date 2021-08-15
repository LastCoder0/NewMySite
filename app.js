const dotenv=require('dotenv').config();
const express=require('express');
const ejs = require('ejs');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path =require('path');
const mePanel_Router = require('./src/routers/mePanel_Router')
const page_Router = require('./src/routers/page_Router');
const flash = require('connect-flash');
const session = require('express-session');
const passport =require('passport')
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'./src/views'));
app.use(express.urlencoded({extended:true}));
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_STRING,
    collection: 'session'
  });
//session ve flash message
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 *24
    },
    store : sessionStore,

}));
app.use(flash());
app.use((req,res,next)=> {
    res.locals.validation_error = req.flash('validation_error');
    res.locals.email = req.flash('email');
    res.locals.name = req.flash('name');
    res.locals.surname = req.flash('surname');
    res.locals.password = req.flash('password');
    res.locals.repassword = req.flash('repassword');
    res.locals.success_message = req.flash('success_message');
    res.locals.login_error =req.flash('error');
next();
})
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/database');



app.use('/',page_Router);
app.use('/me',mePanel_Router);


app.listen("3000",()=> {
    console.log("3000 porta calisti");
})