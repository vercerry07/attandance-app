let mongoose = require('mongoose')
let teacherchema = new mongoose.Schema({

    
      user:{type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
      },                     
      name:{ type: String, required:true},
      
      email:{ type:String, required:true},
      
      
      
      phone:{ type:Number, required:true},
      password:{ type:String, required:true}
    })


    
module.exports = teacherchema 