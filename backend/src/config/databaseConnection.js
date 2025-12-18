import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const mongoUrl = process.env.MONGO_URI;

export const connectToMongo = async () => {
  await mongoose.connect(mongoUrl);
};

connectToMongo().then(() => {
  console.log("connect to mongodb Successfully");
});


