import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
    try {
        // const conn = await mongoose.connect("mongodb+srv://Priyanshu:hRiiPEvZK8vUWm7U@cluster0.0if0l0m.mongodb.net/Manager?retryWrites=true&w=majority&appName=Cluster0");
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        // local mongodb host
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Manager");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectToMongoDB;