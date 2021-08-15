const User = require('../models/user_model')
const oturumAcilmis =(req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }else {
        req.flash('error',['Lütfen önce oturum acin']);
        res.redirect('/login');
    }
     
 }
 const oturumAcilmamis = async(req,res,next) => {
     if(!req.isAuthenticated()){

         return next();
     }else {
           const isAdmin = req.user.isAdmin;
           if(!isAdmin==false){
               console.log(req.user);
            res.render("me",{layout: '../views/layout/me_layout.ejs',admin: req.user});

           }else {
            res.render("siparislerim",{layout: '../views/layout/page_layout.ejs',admin:req.user});

           }
         
     }
      
  }
 module.exports = {
     oturumAcilmis,
     oturumAcilmamis
 }