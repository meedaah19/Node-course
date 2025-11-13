import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("Loaded env from:", process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((error) => {
  console.log(" Connection error:", error);
});

