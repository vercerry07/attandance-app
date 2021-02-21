let jwt = require('jsonwebtoken');
let mongoose = require('mongoose')
let Teacher = mongoose.model('teacher')
module.exports = (req,res,next)=>{

    let {authorization} = req.headers;
     if(!authorization) {
      return res.status(401).json({
          msg:'you have to log in first'
      })
     }
    let token = authorization.replace("Bearer ","");
    jwt.verify(token,'nrujnhgn25',(err,payload)=>{
            if(err){
              return res.status(401).json({
                  msg:'error'
              })
            }

            let {_id} = payload;
             Teacher.findById(_id).then((userdata)=>{
                    
                req.user = userdata
                    next();
            })
    })
}