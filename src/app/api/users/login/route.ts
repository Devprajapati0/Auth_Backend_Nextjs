import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose";

connectDb();

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(8)
})

export async function POST(request: NextRequest) {
    try {
        const reqData = loginSchema.safeParse(await request.json())
    
        if (!reqData.success) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 }
            )
        }
        const data = await User.findOne(
            {
                email: reqData.data.email,
            }
        )
    
        if (!data) {
            return NextResponse.json(
                { error: "Cannot find user" },
                { status: 400 }
            )
        }
    
        const password = await bcryptjs.compare(reqData.data.password, data.password)
        if (!password) {
            return NextResponse.json(
                { error: "Incorect password" },
                { status: 400 }
            )
        }
    
        const tokenPayload:{
            id:ObjectId,
            email:string
        } = {
            id: data._id,
            email: data.email
        }
    
        const tokenGenerated = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
            expiresIn: '10d'
        });
    
        const resposne = NextResponse.json(
            {
                message: "Logined successfully",
                success: true
            }
        )
    
        resposne.cookies.set("token",tokenGenerated,{
            httpOnly:true
        })
        return resposne
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}