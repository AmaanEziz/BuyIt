const express= require('express')
const app=express()
const bcrypt=require('bcrypt')
const bodyParser = require("body-parser");
const Users=require('./Models/Users.js')
const Inventory=require('./Models/Inventory.js')
const mongoose=require('mongoose')
const cors=require('cors')
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("listening on port "+port);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.set('view engine','ejs')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://amaaneziz:Amaan123!!@cluster0.c0obkl3.mongodb.net/?retryWrites=true&w=majority', {
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
        return res.status(200).json(user)
    }
    else {
        return res.sendStatus(400)
    }
    })
.catch(err=>{return res.sendStatus(400)})
})


app.post('/homepage',async (req,res)=>{
    let inventory=await Inventory.find({}).catch((err)=>{
        res.sendStatus(400)
        return
    })
    let user= await Users.findOne({SID:req.body.SID}).catch(err=>{
        console.log(err)
    })
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
    let newInventory={}
   await Users.findOne({SID:req.body.SID}).then(async (user)=>{
        newInventory= new Inventory({
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
    


    
})



app.post("/item/:id",(async (req,res)=>{
let item=await Inventory.findById(req.params.id).catch(err=>{return res.sendStatus(400)})
let user= await Users.findOne({SID:req.body.SID})
item._id=String(item._id)
res.json({item:item,user:user})
    return
}))

app.post("/deleteItem/:id",(async (req,res)=>{
    Inventory.findByIdAndRemove(req.params.id).then(async item=>{
        console.log(item)
        await Users.findOneAndUpdate({SID:req.body.SID},
            {$pull:{selling:item}},{new:true}).then(user=>{
                console.log(user)
            })
            
            .catch(()=>{
                res.sendStatus(400)
                return
            })
    }).catch(()=>{
        res.sendStatus(400)
        return
    })



}))




app.post('/shoppingCart',async (req,res)=>{
  await Users.findOne({SID:req.body.SID}).then(user=>{
    res.json(user)
    
    return

  })
    
})


app.post('/deleteFromCart',(req,res)=>{
    Users.findOneAndUpdate({SID:req.body.SID},
        {$pull:{shoppingCart:req.body.item}},{new:true}).then(changedUser=>{    
            res.sendStatus(200)
            return

        }).catch(err=>{
            res.sendStatus(400)
            return
        })
})

app.post('/buyNow', async (req,res)=>{
let unavailable=[]

for (const cartItem of req.body.shoppingCart){
await Inventory.findById(cartItem._id,async (err,result)=>{
    if(err|| !result ){ 
        unavailable.push(cartItem)
        await Users.findOneAndUpdate({SID:req.body.SID},
            {$pull:{shoppingCart:cartItem}})
            .catch(err=>{console.log(err)})
    }
    
})
.catch(err=>{  
    console.log(err)
})


}
res.json(unavailable)
})



app.post('/approveBuyNow', async (req,res)=>{
    let unavailable=[]
    
    for (const cartItem of req.body.shoppingCart){
    await Inventory.findById(cartItem._id,async (err,result)=>{
        if(err|| !result ){ 
            unavailable.push(cartItem)
        }
        
    })
    .catch(err=>{  
        console.log(err)
    })
    
    await Users.findOneAndUpdate({SID:req.body.SID},
        {$pull:{shoppingCart:cartItem}})
        .catch(err=>{console.log(err)})
    
    let cartitem=cartItem
    cartitem._id= mongoose.Types.ObjectId(cartItem._id)
        await Users.findOneAndUpdate({username:cartitem.seller},
            {$pull:{selling:cartItem}},{new:true}).then(user=>{
                console.log(user)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    
        res.json(unavailable)
        return
    
    
    })


