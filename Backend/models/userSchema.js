const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

    userName:String,
    userEmail:String,
    userPass:String,
})

module.exports=mongoose.model('users',userSchema,"users")