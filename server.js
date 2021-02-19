const express= require('express')
const app=express()
const bcrypt=require('bcrypt')
const bodyParser = require("body-parser");
const Users=require('./Models/Users.js')
const Inventory=require('./Models/Inventory.js')
const mongoose=require('mongoose')
const cors=require('cors')
const { v4: uuidv4 } = require('uuid');
app.listen(3001)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.set('view engine','ejs')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BuyIt', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
mongoose.set('useFindAndModify', false);


app.get('/',(req,res)=>{
    res.send("working")
})
app.post('/registration', async (req,res)=>{
let newUser=new Users({
    username:req.body.username,
    password: await bcrypt.hash(req.body.password,10),
    sessionID:uuidv4()
})
await newUser.save().then(()=>{
    res.status(200).send({ status: 'OK'});
}).catch(error=>{
    res.status(400).send({status:"Username already in use"})
})

})



app.post('/login',(req,res)=>{
    Users.findOne({username:req.body.username}, async (err,result)=>{
        let validPassword= await bcrypt.compare(req.body.password,result.password)
        if (err || !validPassword ){
            res.sendStatus(400).send({status:"Username and Password are incorrect"})
        }
        else {
        let user= await Users.findOneAndUpdate({username:req.body.username},{sessionID:uuidv4()},{new:true})
        .catch(err=>{console.log(err)})
        res.status(200).json({SID:user.sessionID})

    }

    }).catch(err=>{res.sendStatus(400).send({status:"Username and Password are incorrect"})})
})

app.get('/homepage',(req,res)=>{
    Inventory.find({},(err,result)=>{
        if (err) console.log(err)
        res.send(result)
    })

})
app.get('/results/:search',(req,res)=>{
    Inventory.find({name: {$regex: req.params.search, $options: 'i'}}).limit(5).then((err,result)=>{
        if (err) res.send(err)
        res.send(result)
    })
})
async function addNewInventory(){
let car= new Inventory({name:"banana",cost:1,photoURL:"NA"})
await car.save()
Inventory.find({}).then(result=>{console.log(result)}) }
