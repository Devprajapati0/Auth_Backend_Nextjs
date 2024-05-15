import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"


connectDb()


export async function GET(request:NextRequest){
    try {
        const response = NextResponse.json(
            {message:"logout successfully",
            status:200
            }
        )
        response.cookies.delete("token")

        return response
        
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}