const User = require('../models/user_model');
const {validationResult } =require('express-validator');
const passport = require('passport');
const bcrypt  =require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('../config/passport')(passport);


const pageFirst = (req,res,next)=> {
    let loggedName=false;
    if(loggedName===false){
        res.render('index',{layout : './layout/page_layout',loggedName});
    }else {
        res.render('index',{layout : './layout/page_layout'});

    }

}
const pageContact =(req,res,next) => {
      res.render('iletisim',{layout :'./layout/page_layout'});
}
const pageLogin =(req,res,next) => {

    res.render('login',{layout :'./layout/page_layout'});
}
const pageLoginPOST =async(req,res,next) => {

    req.flash('email',req.body.email);
    req.flash('password',req.body.password);
    const Errors = validationResult(req);
    if(!Errors.isEmpty()){
        const error = Errors.array();
        req.flash('validation_error',error);

        
      res.redirect('/login');
    }else {

        const Admin = await User.findOne({email : req.body.email});
        if(Admin.isAdmin==false){
            passport.authenticate('local',{
                successRedirect :'/siparislerim',
                failureRedirect :'/login',
                failureFlash:true,
              
            })(req,res,next);
        }else {
            passport.authenticate('local',{
                successRedirect :'/me',
                failureRedirect :'/login',
                failureFlash:true,
            })(req,res,next);
        }
       
    
    }

}
const pageRegister =(req,res) => {
    res.render('register',{layout :'./layout/page_layout'});
}
const pageRegisterPOST = async (req,res,next)=> {
         
    const Errors = validationResult(req);
    if(!Errors.isEmpty()){
        const error = Errors.array();
        req.flash('validation_error',error);
        req.flash('email',req.body.email);
        req.flash('name',req.body.name);
        req.flash('password',req.body.password);
        req.flash('repassword',req.body.repassword);

        res.redirect('/register');
    }else {
        try {
          const _user = await User.findOne({email : req.body.email})
            if(_user && _user.emailAktif==true){
                req.flash('validation_error',[{msg : 'Bu email zaten kayıtlı'}]);
                req.flash('email',req.body.email);
                req.flash('name',req.body.name);
                req.flash('surname',req.body.surname);
                req.flash('password',req.body.password);
                req.flash('repassword',req.body.repassword);
                res.redirect('/register');
            }else if((_user && _user.isEmailActive == false) || _user==null) {
               if(_user){
                   await User.findByIdAndRemove({_id : _user._id});
               }
               var date = new Date().toLocaleString();
               const newUser = new User({
                    email : req.body.email,
                    name : req.body.name,
                    surname : req.body.surname,
                    password : await bcrypt.hash(req.body.password,10),
                    createdDate : date,

                });
                await newUser.save();
                console.log('Kullanıcı kaydedildi');
               //JWT işlemleri
               const jwtInfo ={
                   id : newUser.id,
                   mail : newUser.email
               };
              const jwtToken = jwt.sign(jwtInfo,process.env.CONFIRM_MAIL_JWT_SECRET,{
                  expiresIn:'1d'});

               //Mail gönderme işlemleri
               const url = process.env.WEB_SITE_URL+'verify?id='+jwtToken;
                 console.log("gidecek url : "+url);
              let transporter = nodemailer.createTransport({
                  service :'gmail',
                  auth : {
                      user : process.env.GMAIL_USER,
                      pass : process.env.GMAIL_PASS
                  }
              });
              await transporter.sendMail({
                  from :'Node Js Uygulamasi <info@nodejskursu.com',
                  to : newUser.email,
                  subject : "Emailinizi Lütfen onaylayın",
                  text : "Emailinizi onaylamak için lütfen şu linke tıklayın :"+url

              },(error,info)=> {
                  if(error){
                      console.log("Bir hata var :" +error);
                  }
                  console.log("Mail gönderildi");
                  console.log(info);
                  transporter.close();
              })
              req.flash('success_message',[{msg : 'Lütfen mail kutunuzu kontrol edin'}]);

                res.redirect('/login');
            }
        }
        catch(error) {
              console.log("Bir hata cikti"+error);
        }
    }


  
   
}
const pageForgetPass=(req,res,next) => {

    res.render('forget-password',{layout :'./layout/page_layout'});
}
const verifyEmail = (req,res,next) => {
    const token = req.query.id;
    if(token){
       try {
         jwt.verify(token,process.env.CONFIRM_MAIL_JWT_SECRET,async(e,decoded)=> {
            if(e){
                req.flash('error','Kod hatali veya Süresi Geçmiş');
                res.redirect('/login')
            }else {
                const tokenInsideID =decoded.id;
                const result = await User.findByIdAndUpdate(tokenInsideID,
                 {
                     isEmailAct :true
                 });
                 if(result){
                     req.flash("success_message",[{msg : "Başarıyla mail onaylandi"}]);
                     res.redirect('/login');
                 }else {
                     req.flash("error",'Lütfen tekrar kullanici oluşturun');
                     res.redirect('/login');
                 }
            }
         })
       } catch (error) {
           
       }

    }else {
     req.flash("error",'Geçersiz Link ve ya Süresi Geçmiş Link');
     res.redirect('/login');
    }
}
const mePanelLogOut =(req,res,next) =>{
    req.logout();
    req.session.destroy((error) => {
        res.clearCookie('connect.sid');
        // req.flash('success_message',[{msg : 'Başarıyla çıkış yapıldı'}]);
        res.render('login',{layout : '../views/layout/page_layout.ejs',success_message :[{msg : 'Başarıyla çıkış yapıldı'}],title : "Giriş yap"}
        );
    
    });
}
const Sepet = (req,res,next) => {
    
    res.render('sepetim',{layout :'./layout/page_layout'});

}
const userLogin = (req,res,next) => {
    
    res.render('siparislerim',{layout :'./layout/page_layout',admin : req.user});

}
module.exports = {
    pageFirst,
    pageContact,
    pageLogin,
    pageRegister,
    pageForgetPass,
    mePanelLogOut,
    userLogin,
    Sepet,
    //POST
    pageRegisterPOST,
    pageLoginPOST,
    verifyEmail
}