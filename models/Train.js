const mongoose=require('mongoose');

const trainSchema=new mongoose.Schema({
    trainName:{
        type:String,
        required:true,
        unique:true
    },
    source:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    seatingCapacity:{
        type:String,
        required:true
    },
    Arival_time_at_Source:{
        type:String,
        required:true,

    },
    Arival_time_at_Destination:{
        type:String,
        required:true,

    },
    admin:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"admin"
        }
        
    ]

})

const Train=mongoose.model('Train',trainSchema)

module.exports=Train