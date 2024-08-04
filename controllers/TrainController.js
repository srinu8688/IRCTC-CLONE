const Train=require('../models/Train');
const Admin=require('../models/Admin');


const addTrain = async(req,res)=>{
    
    
    try {
        const {trainName,source,destination,seatingCapacity,Arival_time_at_Source,Arival_time_at_Destination}=req.body
        const admin=await Admin.findById(req.adminId)
        if(!admin){
            res.status(404).json({message:"Admin not found"})
        }

        const train=new Train({
        trainName,source,destination,seatingCapacity,Arival_time_at_Source,Arival_time_at_Destination,admin:admin._id
    })
    const savedTrain=await train.save();
    traindId=savedTrain._id
    admin.train.push(savedTrain)
    return res.status(200).json({message:"Train Added Successfully",trainId})
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
    }
}
const deleteTrainById=async(req,res)=>{
    try {
        const trainId=req.params.trainId
        const deletedTrain=await Train.findByIdAndDelete(trainId)
        if(!deletedTrain){
            return res.status(404).json({error:"No product found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
        
    }
}

module.exports={addTrain,deleteTrainById}