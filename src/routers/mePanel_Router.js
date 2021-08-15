const router = require('express').Router();
const mPanel_Controller =require('../controllers/mePanel_controller');
const authMiddleware=require('../middleware/authmiddleware');

// const multerConfig = require('../config/multer_config');
router.get('/',authMiddleware.oturumAcilmis,mPanel_Controller.mePanel);
router.get('/profileAdmin',authMiddleware.oturumAcilmis,mPanel_Controller.mePanelProfile);
router.get('/Products',authMiddleware.oturumAcilmis,mPanel_Controller.Products);
router.get('/ProductsAdd',authMiddleware.oturumAcilmis,mPanel_Controller.ProductsAdd);
router.post('/ProductsAdd',authMiddleware.oturumAcilmis,mPanel_Controller.ProductsAddPOST);


//,multerConfig.single("avatar")

module.exports = router;