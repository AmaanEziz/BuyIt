const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        unique:true
    },
    password:{
        type:String,
        unique:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false,
        unique:false
    },
    sessionID:{
        type:String,
        unique:true
    },
    shoppingCart:{
        type:[String],
        default:[],
        unique:false
    },
    selling:{
        type:[String],
        default:[],
        unique:false
    }
})


module.exports= mongoose.model('Users',userSchema)