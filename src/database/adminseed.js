import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

const adminseed = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@Vetlypets.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin1234", 10);

      const admin = new Admin({
        userName: "superAdmin",
        email: "admin@Vetlypets.com",
        password: hashedPassword,
        role: "admin"
      });

      await admin.save();
      console.log("Admin account created!");
    } else {
      console.log("Admin already exists.");
    }
  } catch (error) {
    console.error("Error creating admin.", error);
  }
};

export default adminseed;