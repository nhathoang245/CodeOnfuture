import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/code-on-future`)
    } catch (error) {
        console.log("Error at catch connectDB of db")
        console.log(error.message);
    }
}

export default connectDB;