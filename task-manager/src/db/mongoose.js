import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/task-manager").then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((error) => {
  console.log(" Connection error:", error);
});

