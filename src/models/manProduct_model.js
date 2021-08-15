const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    productName : {
        type : String,
        required :[true,'Ürün Adı  zorunlu olmalidir'],
        trim : true,
        minLength : 2,
        maxLength : 30
    },
    productCategory : {
        type : String,
        required :[true,'Ürün Kategori alani zorunlu olmalidir'],
        trim : true,
        minLength : 2,
        maxLength : 30
    },
    productPrice : {
        type : String,
        required :true,
        trim : true,
      
    },
    productAmount : {
        type:String,
        required :true,
        trim : true
    },
    createdDate :{
        type: String,
    },
    productRegion :{
        type:String,
        required:true,
        trim : true
    },
    isActive: {
        type:Boolean,
        required:true,
        trim:true,
        default: false
    }
  
   
},{collection : 'Products',timestamps:true});

const Products = mongoose.model('Products',ProductSchema);


module.exports = Products;