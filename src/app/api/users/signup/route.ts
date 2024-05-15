import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model"
import { NextRequest,NextResponse} from "next/server"
import {z} from "zod"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connectDb();





const signupInput = z.object({
    username:z.string().toLowerCase().trim(),
    email:z.string().email(),
    password:z.string().min(6).max(8)
})

export async function POST(request:NextRequest){
    try {
        const signupData = signupInput.safeParse(await request.json());
        if(!signupData.success){
            return NextResponse.json(
                {error:"invalid credentials"},
                {status:400}
            )
        }
    
      const user =   await User.findOne({
            email:signupData.data.email
        })
        if(user){
            return NextResponse.json(
                {message:"have account already"},
                {status:201}
            )
        }
    
        
        const salt =await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(signupData.data.password,salt)
    
    
        const newUser = new User(
            {
                username:signupData.data.username,
                email:signupData.data.email,
                password:hashPassword
            }
        )
      const data = await newUser.save()
      console.log("saved user",data)
    
      //send verificaion mail
      await sendEmail(
        {
            sendEmailTo:data.email,
            emailType:'VERIFY',
            userId:data._id
        }
      )
    
        return NextResponse.json(
            {message:"user registerd successfully",
            success:true,
            data
            },
    
        )
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
