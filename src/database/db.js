import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async (url) => {
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to Database");   
        return;  
    } catch (error) {
        console.log("Error connecting to Database:", error.message);
        process.exit(1);
  }
};
export default connectDB;