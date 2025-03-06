import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const adminLogin = async (req, res) => {
  try {
      const { userName, email, password } = req.body;

    
      if (!(userName || email) || !password) {
          return res.status(400).json({ message: "Please provide an email or username and a password" });
      }

      const admin = await Admin.findOne({ 
          $or: [{ email }, { userName }],
          role: { $in: [ "admin"] } 
      });

      if (!admin) {
          return res.status(403).json({ message: "Access denied. Admins only!" });
      }

      
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

     
      const token = jwt.sign(
          { id: admin._id, role: admin.role }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1d" }
      );

      res.json({ 
          message: "Admin login successful", 
          token, 
          admin: { id: admin._id, userName: admin.userName, email: admin.email, role: admin.role } 
      });

  } catch (error) {
      console.error("Admin Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
