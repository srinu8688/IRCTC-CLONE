const Admin=require("../models/Admin")
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const dotEnv=require('dotenv')
dotEnv.config();
const secretKey=process.env.WhatIsYourName
const adminRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const adminEmail=await Admin.findOne({email});
        if(adminEmail){
            return res.status(400).json("Email already taken")
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin= new Admin({
            username,
            email,
            password:hashedPassword
        });
        await newAdmin.save();
        res.status(201).json({message:"Admin Registered Successfully"});
        console.log("registered")
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
        
    }
}

const adminLogin=async(req,res)=>{
    const {email,password}=req.body;
try {
    const admin=await Admin.findOne({email});
    if(!admin || !(await bcrypt.compare(password,admin.password))){
        return res.status(401).json({error:"Invalid username or password"})
    }
    const token=jwt.sign({adminId:admin._id},secretKey,{expiresIn:"60h"})
    res.status(200).json({success:"Login successfull",token})
    console.log(email,"this is token",token);
} catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"})
}
}
module.exports={adminRegister,adminLogin}