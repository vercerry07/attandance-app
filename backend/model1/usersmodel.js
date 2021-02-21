let mongoose = require('mongoose')
let userschema = new mongoose.Schema({

    

      name:{ type: String, required:true},
      email:{ type:String, required:true},
      phone:{ type:Number, required:true},
      
      password:{ type:String, required:true},

       
   
    
    })
module.exports = userschema 