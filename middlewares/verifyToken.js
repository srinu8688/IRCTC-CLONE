const Admin=require("../models/Admin");
const jwt=require("jsonwebtoken")
const dotEnv=require('dotenv');
dotEnv.config()
const secretKey=process.env.WhatIsYourName

const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({error:"Token is required"});
    }
    try {
        const decoded=jwt.verify(token,secretKey)
        const admin=await Admin.findById(decoded.adminId)
        if(!admin){
            return res.status(404).json({error:"admin not found"})
        }
        req.adminId=admin._id
        next()
    } catch (error) {
        console.error(error)
    return res.status(500).json({error:"Invalid Token"})
    }
}

module.exports=verifyToken