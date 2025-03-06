import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import logger from "../utils/log/logger.js"

// Sign up controller

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
if (  !userName || !email || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

 const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword});
    await newUser.save();
    
    return res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const login = async (req, res) => {
  try {
      const { userName, email, password } = req.body;

      if (!(userName || email) || !password) {
          return res.status(400).json({ message: "Please provide an email or username and a password" });
      }

      const user = await User.findOne({ 
          $or: [{ email }, { userName }] 
      });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
          { id: user._id, role: user.role }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1d" }
      );

      res.json({ 
          message: "Login successful", 
          token, 
          user: { id: user._id, userName: user.userName, email: user.email, role: user.role } 
      });

  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};