import mongoose from "mongoose";

export default async function mongoConnection(url){
  try {
    await mongoose.connect(url);
    console.log("database connected");
    
  } catch (error) {
    console.log("failed to conect with database",error);
    
  }
}