import mongoose from "mongoose";

export const connectDB  = async () => {
    await mongoose.connect('mongodb+srv://shreyachoudhary:12109554@cluster0.bstw9sh.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}