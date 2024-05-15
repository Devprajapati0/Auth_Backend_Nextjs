import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
    },
    password:{
        type:String,
        required:[true,'Please provide a username'],
        min:[6,"password should have alteast 8 letters"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date, 
})

 export const User =mongoose.models.users || mongoose.model('users',userSchema)