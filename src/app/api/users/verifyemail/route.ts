import { connectDb } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import { tokenToString } from "typescript";
import {z} from "zod"

connectDb()


const verifySchema = z.object(
    {token:z.string()}
)
export async function POST(request: NextRequest){
    try {
        const resData = verifySchema.safeParse(await request.json());
        if(!resData.success){
            return NextResponse.json(
            {error:"Invalid credentials"},
            {status:400}
            )
        } 
        console.log("resData",resData)

      const dataFound =  await User.findOne({
            verifyToken:resData.data.token,
            verifyTokenExpiry:{
                $gt:Date.now()
            }
        })
        console.log("data Found:",dataFound)

        if(!dataFound){
            return NextResponse.json(
                {error:"Problem while signing up u"},
                {status:400}
                )
        }

        dataFound.isVerified = true;
        dataFound.verifyToken = undefined;
        dataFound.verifyTokenExpiry = undefined

        await dataFound.save()

        return NextResponse.json(
            {
                message:"successfully verified",

            }
        )



    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}