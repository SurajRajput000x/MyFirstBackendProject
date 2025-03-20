import express from 'express'
import cookiesParser from 'cookies-parser'
import cors from 'cors'

const app = express()

//                                  Middle Wares
app.use(cors({                                                                 // EXPLORE...
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))                                          // EXPLORE...
// app.use(express.urlencoded())
app.use(express.urlencoded({extended: true, limit: "16kb"}))                    
app.use(express.static("public"))
app.use(cookiesParser())













export {app}