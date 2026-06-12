import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("bufferCommands", false);

const connectionDB = async () => {
  try {
    if (!process.env.MONGOURL) {
      console.log("MONGOURL is missing in .env");
      throw new Error("MONGOURL is missing in .env");
    }

    await mongoose.connect(process.env.MONGOURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("MongoDB connection error", error);
    throw error;
  }
};

export default connectionDB;
