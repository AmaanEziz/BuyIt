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
    SID:{
        type:String,
        unique:true,
        default:"100"
    },
    shoppingCart:{
        type:[String],
        default:[],
        unique:false
    },
    selling:{
        type:[{}],
        default:[],
        unique:false
    }
})


module.exports= mongoose.model('Users',userSchema)