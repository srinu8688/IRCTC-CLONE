
const mongoose=require("mongoose")

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    train:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Train"
        }
    ]
})


const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;