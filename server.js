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
  return  res.sendStatus(200)
}).catch(error=>{
   return res.sendStatus(400)

})

})



app.post('/login',(req,res)=>{
    Users.findOne({username:req.body.username}, async (err,result)=>{
        if (result){
        let validPassword= await bcrypt.compare(req.body.password,result.password)
        let user= await Users.findOneAndUpdate({username:req.body.username},{SID:uuidv4()},{new:true})
        .catch(err=>{return res.sendStatus(400)})
        return res.status(200).json({SID:user.SID})
    }
    else {
        return res.sendStatus(400)
    }
    })
.catch(err=>{return res.sendStatus(400)})
})


app.post('/homepage',async (req,res)=>{
    let inventory=await Inventory.find({})
    let user= await Users.findOne({SID:req.body.SID})
    let response={inventory:inventory,user:user}
    res.json(response)
    return 

})

app.post('/addToCart',async (req,res)=>{
    await Users.findOneAndUpdate({SID:req.body.SID},
        {$push:{shoppingCart:req.body.item}})
        .then(()=>{
            return res.sendStatus(200)
        })
        .catch(()=>{
            return res.sendStatus(400)
        })

})
app.get('/results/:search',(req,res)=>{
    Inventory.find({name: {$regex: req.params.search, $options: 'i'}}).limit(5).then((err,result)=>{
        if (err) return res.send(err)
        return res.json(result)
    })
})


app.post('/newListing',async (req,res)=>{
    let user= await Users.findOne({SID:req.body.SID})
    console.log(user.username)
    let newInventory= new Inventory({
        name:req.body.name,
        cost:req.body.cost,
        photoURL:req.body.photoURL,
        seller: user.username,
        description:req.body.summary
    })

  await newInventory.save().then(async (item)=>{
       await Users.findOneAndUpdate({SID:req.body.SID},
       {$push:{selling:item}},{new:true})
        .catch(err=>{ return res.sendStatus(400)
        })
        return res.sendStatus(200)
    }).catch(error=>{
        return res.sendStatus(400)
    })
    
})

app.get("/item/:id",(async (req,res)=>{
let item=await Inventory.findById(req.params.id).catch(err=>{return res.sendStatus(400)})
return res.sendStatus(200).json()
}))

app.post('/shoppingCart',async (req,res)=>{
  await Users.findOne({SID:req.body.SID}).then(user=>{
    res.json(user.shoppingCart)
    console.log(user.shoppingCart)
    return

  })
    
})


app.post('/deleteFromCart',(req,res)=>{
    Users.findOneAndUpdate({SID:req.body.SID},
        {$pull:{shoppingCart:req.body.item}},{new:true}).then(changedUser=>{    
            console.log(changedUser)
            res.sendStatus(200)
            return

        }).catch(err=>{
            res.sendStatus(400)
            return
        })
})

app.post('/buyNow',(req,res)=>{
Inventory.findByIdAndRemove(req.body.item._id,(err,result)=>{
    if(err){
        res.sendStatus(400)
        return
    }
}).catch(err=>{
    res.sendStatus(400)
    return
})

Users.findOneAndUpdate({SID:req.body.SID},
    {$pull:{shoppingCart:req.body.item}})
    .then(result=>{
        res.sendStatus(200)
    })
    .catch(err=>{
        res.sendStatus(400)
        return
    })

})

async function deleteAll(){
await Users.deleteMany({})
await Inventory.deleteMany({})
}

