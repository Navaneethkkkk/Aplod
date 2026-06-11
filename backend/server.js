import express from "express"

import cors from "cors"
import connectionDB from "./Database/Connection.js"

const app =express()
const PORT = process.env.PORT || 6001

app.use (express.json())

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

connectionDB()

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
})