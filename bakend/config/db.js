import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://full_stack:full_stack_123@cluster0.nojqt8f.mongodb.net/food-del').then(()=>console.log("DB connected"))
}