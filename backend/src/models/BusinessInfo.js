import mongoose from "mongoose";

const businessInfoSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      default: "Smart Click Computers",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      default: "No. 123, Galle Road, Colombo, Sri Lanka",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      default: "+94 11 234 5678",
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      default: "info@smartclick.com",
    },
    businessHours: {
      type: String,
      default: "Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: Closed",
    },
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com/smartclick" },
      instagram: { type: String, default: "https://instagram.com/smartclick" },
      twitter: { type: String, default: "https://twitter.com/smartclick" },
      linkedin: { type: String, default: "https://linkedin.com/company/smartclick" },
      youtube: { type: String, default: "https://youtube.com/smartclick" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BusinessInfo", businessInfoSchema);
