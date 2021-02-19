const mongoose=require('mongoose')

const inventorySchema=new mongoose.Schema({
    name:{
        type:String
    },
    photoURL:{
        type:String
    },
    cost:{
        type: Number
    }
})

module.exports= mongoose.model('Inventory',inventorySchema)