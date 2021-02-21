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



app.post('/registration', async (req,res)=>{
let newUser=new Users({
    username:req.body.username,
    password: await bcrypt.hash(req.body.password,10),
})
await newUser.save().then(()=>{
    res.sendStatus(200)
    console.log("success saving")
}).catch(error=>{
    res.sendStatus(400)

})

})



app.post('/login',(req,res)=>{
    Users.findOne({username:req.body.username}, async (err,result)=>{
        if (result){
        let validPassword= await bcrypt.compare(req.body.password,result.password)
        let user= await Users.findOneAndUpdate({username:req.body.username},{SID:uuidv4()},{new:true})
        .catch(err=>{console.log(err)})
        res.status(200).json({SID:user.SID})
    }
    else {
        res.sendStatus(400)
    }
    })
.catch(err=>{res.sendStatus(400)})
})

app.get('/homepage',(req,res)=>{
    Inventory.find({},(err,result)=>{
        if (err) console.log(err)
        res.json(result)
    })

})
app.get('/results/:search',(req,res)=>{
    Inventory.find({name: {$regex: req.params.search, $options: 'i'}}).limit(5).then((err,result)=>{
        if (err) res.send(err)
        res.json(result)
    })
})


app.post('/newListing',async (req,res)=>{
    let newInventory= new Inventory({
        name:req.body.name,
        cost:req.body.cost,
        photoURL:req.body.photoURL,
        sellers:new Map()
    })
    await Users.findOne({SID:req.body.SID},(err,user)=>{
        newInventory.sellers.set(user.username,1)
    })
    
  await newInventory.save().then(async (item)=>{
       await Users.findOneAndUpdate({SID:req.body.SID},
       {$push:{selling:item}},{new:true})
        .catch(err=>{console.log(err)})
        res.sendStatus(200)
    }).catch(error=>{
        res.sendStatus(400)
    })
    
})

app.get("/item/:id",(async (req,res)=>{
let item=await Inventory.findById(req.params.id)
console.log(item)
res.send(item)
}))

async function deleteAll(){
await Users.deleteMany({})
await Inventory.deleteMany({})
}
