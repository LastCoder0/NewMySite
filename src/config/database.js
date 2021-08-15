const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_STRING,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false})
.then( ()=> console.log("Veritabanına bağlanıldı"))
.catch(err => console.log("Veritabanina bağlanırken hata oluştu : "+err));

