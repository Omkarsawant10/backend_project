import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async (req,res)=>{
   //get user details from frontend
   //validation -not empty
   //if user already exist-username email
   //check for images avtar
   //upload them to cloudinary
   //create user object-create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return response
   const {fullName,email,username,password}=req.body
   console.log(`FullName:${fullName} Email:${email}`)

   if([fullName,email,username,password].some((field)=>field?.trim()==="")){
      throw new ApiError(400,"AllFields are required")
   }

   const existedUser=User.find({$or:[{username},{password}]});

   if(existedUser){
      throw new ApiError(400,"username or email exist")
   }

   const avtarLocalPath=req.files?.avtar[0]?.path;
   const coverImageLocalPath=req.files?.coverImage[0]?.path;

   if(!avtarLocalPath){
      throw new ApiError(400,"Avtar is required")
   }

   const avtar=await uploadOnCloudinary(avtarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avtar){
      throw new ApiError(400,"Avtar is required")
   }

   const user=await User.create({
      fullName,
      avtar:avtar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase(),
   })

   const createdUser=User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createdUser){
      throw new ApiError(500,"Something Went wrong while registering user")
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"User Registered Successfully")
   )
})

export {registerUser}