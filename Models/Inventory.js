const mongoose=require('mongoose')

const inventorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photoURL:{
        type:String,
    
    },
    cost:{
        type: Number,
        required:true
    },
    seller:{
        type:String,
        unique:false
    },
    description:{
        type:String
    }
})

module.exports= mongoose.model('Inventory',inventorySchema)