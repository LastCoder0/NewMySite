const ProductModel = require('../models/manProduct_model');

const mePanel = (req,res,next) => {
    res.render('../views/admin/me.ejs',{layout : '../views/layout/me_layout.ejs',admin:req.body});

}
const mePanelProfile =(req,res,next) => {
    res.render('../views/admin/profileAdmin.ejs',{layout : '../views/layout/me_layout.ejs',admin:req.body});

}
const Products =async(req,res,next) => {
   const ProductMan = await ProductModel.find();
   console.log(ProductMan);
    res.render('../views/admin/Products.ejs',{layout : '../views/layout/me_layout.ejs',admin:req.user,product:ProductMan});
}
const ProductsAdd =(req,res,next) => {
    res.render('../views/admin/ProductsAdd.ejs',{layout : '../views/layout/me_layout.ejs',admin:req.body});

}
const ProductsAddPOST =async(req,res,next) => {
    console.log(req.body);
    try {
     
             var date = new Date().toLocaleString();
             const newProduct = new ProductModel({
                  productName : req.body.productName,
                  productCategory : req.body.productCategory,
                  productPrice : req.body.productPrice,
                  productAmount :req.body.productAmount,
                  productRegion : req.body.productRegion,
                  createdDate : date,

              });
              await newProduct.save();
              console.log('Ürün kaydedildi');
    res.redirect("/me/Products");

}
catch(error){
    console.log("Hata cikti : "+error);
}
}
module.exports = {
   
    mePanel,
    mePanelProfile,
    Products,
    ProductsAdd,
    ProductsAddPOST

}