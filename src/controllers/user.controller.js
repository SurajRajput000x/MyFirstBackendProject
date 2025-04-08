import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=> {
   
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    const {username, email, fullName, password} = req.body
    

    if([username, email, fullName, password].some((field)=>{field?.trim === ""})){
        throw new ApiError(400, "All the fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username, email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path
    const coverImageLocalPath = req.file?.coverImage[0]?.path


    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "Avatar file is required 2 .")
    }

    const user = User.create({
        username : username.toLowerCase(),
        email,
        fullName,
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

})


export { registerUser }