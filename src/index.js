// require('dotenv').config()
import dotenv from "dotenv"

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:"./env",
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb Connection Failed !!! ",err);
})

//25:55




// import express from "express";
// const app=express();
// (async ()=>{
//    try {
//       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//       app.on("error",(error)=>{
//         console.log("Error: ",error);
//       })

//       app.listen(process.env.PORT_NUMBER,()=>{
//         console.log(`app is listening at port ${PORT_NUMBER}`)
//       })
//    } catch (error) {
//       console.error("Error:",error);
//       throw error;
//    }
// })()