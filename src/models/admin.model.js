import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    
    role: {
      type: String,
      enum: [ "admin", "user"],
      default: "admin",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Admin", adminSchema);