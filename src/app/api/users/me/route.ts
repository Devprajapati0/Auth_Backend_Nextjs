import { connectDb } from "@/dbConfig/dbConfig";
import { getDataFromUser } from "@/helpers/dataFromUser";
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"


connectDb();



export async function POST(request: NextRequest) {
    try {
        //extract data from token
      const id = await getDataFromUser(request)
   
     const user=   await User.findById(id).select("-password");
     if(!user){
        return NextResponse.json(
            {error:"user not found through in db "},
            {status:500}
        )
     }

     return NextResponse.json(
        {
            message:"user found",
            data:user
        }
    )
      
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}