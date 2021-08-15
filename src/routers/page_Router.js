const router = require('express').Router();
const pageController =require('../controllers/page_controller');
const ValidationMiddleware =require('../middleware/validation_middleware');
const AuthMidleeware = require('../middleware/authmiddleware');

// Get Methods 
router.get('/',pageController.pageFirst);
router.get('/iletisim',pageController.pageContact);
router.get('/login',AuthMidleeware.oturumAcilmamis,pageController.pageLogin);
router.get('/register',AuthMidleeware.oturumAcilmamis,pageController.pageRegister);
router.get('/forget-password',pageController.pageForgetPass);
router.get('/verify',pageController.verifyEmail);
router.get('/logout',AuthMidleeware.oturumAcilmis,pageController.mePanelLogOut);
router.get('/siparislerim',AuthMidleeware.oturumAcilmis,pageController.userLogin);
router.get('/sepetim',pageController.Sepet);

//Post Methods
router.post('/register',AuthMidleeware.oturumAcilmamis,ValidationMiddleware.validateNewUser(),pageController.pageRegisterPOST)
router.post('/login',AuthMidleeware.oturumAcilmamis,ValidationMiddleware.validateLogin(),pageController.pageLoginPOST)



module.exports = router;