import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,          // cloudinary url  
        required: true,
    },
    coverImage:{
        type: String,          // cloudinary url  
    },
    password:{
        type: String,
        required: [true, 'Password is required']

    },
    watchHistory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    refreshToken:{
        type: String,
    }
        
},{timestamps: true})



//                                             // See video from 29:00  https://www.youtube.com/watch?v=eWnZVUXMq8k&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=12

userSchema.pre('save', async function (next){


    // if(this.isModified('password')){
    //     this.password = await bcrypt.hash(this.password, 10)
    // }
    // next()

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()




} /* we do not use arrow function here because arrow function m hamare paas "This" ka refference nhi hota */)                                         



userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)