const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name : {
        type : String,
        required :[true,'isim alani zorunlu olmalidir'],
        trim : true,
        minLength : 2,
        maxLength : 30
    },
    surname : {
        type : String,
        required :[true,'soyad alani zorunlu olmalidir'],
        trim : true,
        minLength : 2,
        maxLength : 30
    },
    email : {
        type : String,
        required :true,
        trim : true,
        unique :true,
        lowercase : true
    },
    password : {
        type:String,
        required :true,
        trim : true
    },
    createdDate :{
        type: String,
    },
    avatar : {
        type : String,
        default : "default.png",
        
    },
    isEmailActive :{
        type : Boolean,
        default :false
    },
    isAdmin : {
        type:Boolean,
        default:false
    }
},{collection : 'user',timestamps:true});

const User = mongoose.model('User',UserSchema);


module.exports = User;