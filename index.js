const express=require("express")
const dotEnv=require("dotenv")
const mongoose=require('mongoose')
const adminRoutes=require("./routes/AdminRoutes")
const bodyParser=require("body-parser")
const trainRoutes=require('./routes/TrainRoutes')
const app=express()

const PORT=process.env.PORT || 4000;
dotEnv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB connected successfully"))
    .catch((error)=>console.log(error))
app.use(bodyParser.json());
app.use("/admin",adminRoutes);
app.use("/train",trainRoutes)

app.listen(PORT,()=>{
    console.log(`Server is started and running at ${PORT}`)
})
app.use(`/`,(req,res)=>{
    res.send("<h1>Welcome to IRCTC Assignment")
})