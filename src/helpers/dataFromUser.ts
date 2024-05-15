import { NextRequest, NextResponse } from "next/server"
import jwt , { JwtPayload } from "jsonwebtoken"



export async function getDataFromUser(request: NextRequest) {
    try {
       const token =  request.cookies.get("token")?.value;
       if(!token){
        return NextResponse.json(
            {message:'Token not found',
                status:203
            }
        )
       }

     const decodeToken:any= jwt.verify(token,process.env.TOKEN_SECRET!)
     
     return decodeToken.id
    
      
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}