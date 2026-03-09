const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    email:{
        unique:true,
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    list:[{
        type:mongoose.Types.ObjectId,
        ref:"List"
    }]
});
module.exports=mongoose.model("User",userSchema)