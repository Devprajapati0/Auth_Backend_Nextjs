import mongoose from "mongoose";

export async function connectDb (){
    try {
       await mongoose.connect(process.env.MONGO_URL!)
        // console.log("mongoose:connection::",mongoose.connection)
        const connection = mongoose.connection
        connection.on('connect',()=>{
            console.log('Database connected')
        })
        connection.on('error',(err)=>{
            console.log("Error while connecting db"+err);
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong in connect to db');
        console.log(error)
    }
}