const LocalStrategy =require('passport-local').Strategy;
const User =require('../models/user_model');
const bcrypt = require('bcrypt');

module.exports = function(passport){
    const options ={
        usernameField : 'email',
        passwordField : 'password'
    };

    passport.use(new LocalStrategy(options,async (email,password, done)=>{ 

        try {
            const _findUser = await User.findOne({email : email});
            if(_findUser){
                const passwordControl  =await bcrypt.compare(password,_findUser.password);
                if(!passwordControl){
                    return done(null,false,{message:'Email yada şifre hatalıdır.'});
        
                   }else {
                       if(_findUser && _findUser.isEmailActive ==false){
                           return done(null,false,{message : 'Lütfen emailinizi onaylayın'});
                       }else {
                           return done(null,_findUser);
       
                       }
        
                   }
            
            
            }else {
                return done(null,false,{message:'Email yada şifre hatalıdır.'});

            }
            
        
           
         
        }
            catch(err){
                return done(err);
            }
                  
            

    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    
    User.findById(id, function(err, user) {
        const newUser ={
            id : user._id,
            email : user.email,
            name : user.name,
            surname : user.surname,
            password : user.password,
            avatar : user.avatar,
            createdDate :user.createdDate,
            isEmailActive : user.isEmailActive,
            isAdmin : user.isAdmin
         }
      done(err, newUser);});
  });
}