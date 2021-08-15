const { body} =require('express-validator');


const validateNewUser = () =>{
    return [
      body('email')
      .trim()
      .isEmail().withMessage('Geçerli bir mail giriniz'),
      body('password')
      .isLength({min:6}).withMessage('Sifre en az 2 karakter olmali')
      .isLength({max:20}).withMessage('Sifre en az 30 karakter olmali')
      .withMessage('Şifre en az 6 karakter olmalı'),
      body('name')
      .trim()
      .isLength({min:2}).withMessage('Soy isim en az 2 karakter olmali')
      .isLength({max:30}).withMessage('Soy isim maxiumum 30 karakter olmali'),
      body('surname')
      .trim()
      .isLength({min:2}).withMessage('Soy isim en az 2 karakter olmali')
      .isLength({max:30}).withMessage('Soy isim maxiumum 30 karakter olmali'),
      body('repassword').custom((value,{req})=> {
           if(value !== req.body.password){
               throw new Error('Şifreler ayni degil');
           }
            return true;
      })
      
    ];
}
const validateLogin = () =>{
    return [
      body('email')
      .trim()
      .isEmail().withMessage('Geçerli bir mail giriniz'),
      body('password')
      .isLength({min:6}).withMessage('Sifre en az 6 karakter olmali')
      .isLength({max:20}).withMessage('Sifre en az 30 karakter olmali')
      
    ];
}
const validateEmail =()=>{
  return [
    body('email')
    .trim()
    .isEmail().withMessage('Geçerli bir mail giriniz'),
   
  ];
}
const validateNewPassword =()=>{
  return [
    body('password').trim()
    .isLength({min:6}).withMessage('Şifre en az 6 karakter olmali')
    .isLength({max :20}).withMessage('Şifre en fazla 20 karakter olmali'),
    body('repassword')
    .trim().custom((value,{req })=>  {
        if(value !==req.body.password){
          throw new Error('Şifreler ayni degil');
        }
        return true;
    })
   
  ];
}

module.exports = {
    validateNewUser,
    validateLogin,
    validateEmail,
    validateNewPassword

}