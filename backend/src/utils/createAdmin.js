import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
  const existing = await Admin.findOne({
    email: "admin@smartclick.com",
  });

  if (existing) {
    //console.log("Admin already exists");
    return;
  }

  const hashedPassword =
    await bcrypt.hash("123456", 10);

  await Admin.create({
    username: "Admin",
    email: "admin@smartclick.com",
    password: hashedPassword,
  });

  console.log("Admin Created");
};

export default createAdmin;