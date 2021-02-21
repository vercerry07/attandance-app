let express = require('express')
let userroute = express.Router()


let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let userschema = require('../model1/usersmodel')
let User = new mongoose.model('users', userschema)

let jwt = require('jsonwebtoken')      



let authantication = require('../middleware/authantication')
userroute.get('/',authantication ,(req,res)=>{
      res.send('hello1')



    })
userroute.get('/attandance',authantication,(req,res)=>{

      console.log(req.user)
      let {_id, name} = req.user
      res.json({
        name:name
      })
       
})

    userroute.post('/register',(req,res)=>{
      //console.log(req.body)
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      
      
      
      let regx = /^(\+\d{1,3}[- ]?)?\d{10}$/
      let {name, email, phone, password } = req.body
      if(!name || !email || !phone || !password){  
        
        res.status(422).json({  
            msg:'please enter all the required fields'
        })
    }
    else {
       
        User.findOne({email:email}).then((exuser)=>{    
      if(exuser){
        
        return res.status(400).json({

        msg:'user exits'
       })
      }
      else if(email && !regexEmail.test(email)){ 
        
        return res.json({

          msg:'invalid email'
        })        
      }      
     else if(phone && !regx.test(phone)){
      return res.json({
        msg:'invalid phone'
      })
     }

      else {
          bcrypt.hash(password,12).then((hashedpwd)=>{
            let newuser = new User({
                name:name,
                email:email,
                phone:phone,
                password:hashedpwd
            })
            newuser.save().then(()=>{
                res.json({
                  msg:'user saved'
                })
            
              })
              .catch((err)=>{
                 console.log(err)
              }) 
          })
          .catch((err)=>{
     console.log(err)
          
    })
        }
       }) 

    } 
})

userroute.post('/login', (req,res)=>{
      //console.log(req.body)
      let {email, password} = req.body

      if(!email || !password){
         res.status(400).json({

          msg:'enter fields'
         })
      }
      else {
        User.findOne({email:email}).then((saveeduser)=>{
         if(!saveeduser){
          res.status(422).json({

            msg:'invalid credentials'
          })
         }
         else {
           bcrypt.compare(password, saveeduser.password).then((domatch)=>{
            if(domatch){
             
             
              let token = jwt.sign({_id:saveeduser._id}, 'nrujnhgn25')
              res.json({
               token:token
             })       
            }
            
            else {



              res.json({
               msg:'invalid credentials'  
              })
            }
          
          })
           .catch((err)=>{
              


            console.log(err)              
           })
         }             
        })
      }
})

module.exports = userroute