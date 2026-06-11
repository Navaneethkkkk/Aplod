import dotenv, { config } from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const connectionDB=()=>{
    mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log("MongoDB connection error",error);
    })
    
}
export default connectionDB