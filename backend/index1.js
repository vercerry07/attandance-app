let express = require('express')
let userroute = require('./routes/usersroute')


let mongoose = require('mongoose');
const teachroute = require('./routes/teachroute');
let app = express();
app.use(express.json());

app.use(express.urlencoded({ extended:true }))



app.use('/users',userroute)
app.use('/teach', teachroute)
mongoose.connect('mongodb://localhost/userap', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{



console.log('connected database')
}).catch((err)=>{

      console.log(err)          
})
app.get('/',(req,res)=>{
      res.send('hello1')
    })

app.listen(3200,()=>{
console.log('server running')

})