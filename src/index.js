// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/db.js'

import {app} from './app.js'
dotenv.config({path:'./.env'})



                                                            // se video 8 FROM: 27:30 and see what is this 
                                                            //       1.) ${connectionInstance.connection.host}
                                                            /*       2.)  "scripts": {
                                                                "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
                                                            }                                            
                                                                                                   */




connectDB()
.then(()=>{
    // app.on("errror", (error)=>{
    //     console.log("ERR :", error)
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB connection failed!!", err)
})












// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";




// import express from 'express'
// const app = express()

// console.log(`${process.env.MONGODB_URL}`)

// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("errror", (error)=>{
//             console.log("ERR :", error)
//             throw error
//         })

//         app.listen(process.env.PORT , ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("mongodb not connected :", error)                        // OR  >>>   console.log("mongodb not connected :", error) 
//         // process.exit(1)
//         throw error
//     }
// })()