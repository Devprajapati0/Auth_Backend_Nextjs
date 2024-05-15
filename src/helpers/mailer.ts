
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { User } from "@/models/user.model"


interface mailer {
    sendEmailTo:string,
    emailType:string,
    userId:any
}


export async function sendEmail({sendEmailTo,emailType,userId}:mailer){
    try {
        const verifyToken = await bcryptjs.hash(userId.toString(),10)

        console.log('token',verifyToken)
        if(emailType === 'VERIFY'){
          const data =  await User.findByIdAndUpdate(
                {_id:userId},
               {
                    verifyToken:verifyToken,
                    verifyTokenExpiry:Date.now() + 3600000
                },
                {new:true}
            )
            console.log("data:",data)
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(
                {_id:userId},
                {
                    forgotPasswordToken:verifyToken,
                    forgotPasswordExpiry:Date.now() + 3600000
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASS
            }
          });


          const mailOptions = {
            from : 'devheinji@gmail.com',
            to:sendEmailTo,
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password',
            html: `<p>click: <a href="${process.env.DOMAIN}/verifyemail?token=${verifyToken}" > here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy and paste the link below in your browser<br>${process.env.DOMAIN}/verifyemail?token=${verifyToken}</p>`
          }

          const info = await transporter.sendMail(mailOptions)
          console.log("info",info)
          return info;

    } catch (error:any) {
        throw new Error(error.message)
    }
}