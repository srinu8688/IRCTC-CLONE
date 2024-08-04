const express=require('express');
const trainController=require("../controllers/TrainController")


const verifyToken=require("../middlewares/verifyToken")
const router=express.Router()
router.post("/add-train",verifyToken,trainController.addTrain)
router.delete("/:trainId",trainController.deleteTrainById);

module.exports=router;