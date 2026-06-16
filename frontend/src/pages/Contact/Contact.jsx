import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getBusinessInfo } from "../../services/businessService";
import { submitInquiry } from "../../services/inquiryService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, ShieldAlert, Landmark } from "lucide-react";

export default function Contact() {
  const location = useLocation();
  const [info, setInfo] = useState({
    businessName: "Smart Click Computers",
    address: "No. 123, Galle Road, Colombo, Sri Lanka",
    phone: "+94 11 234 5678",
    email: "info@smartclick.com",
    businessHours: "Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: Closed",
  });
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  // Check for pre-loaded message (e.g., product detail quick inquiry)
  useEffect(() => {
    if (location.state && location.state.message) {
      setValue("message", location.state.message);
    }
  }, [location.state, setValue]);

  // Fetch store details
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getBusinessInfo();
        if (data) setInfo(data);
      } catch (err) {
        console.error("Failed to load business details:", err);
      } finally {
        setLoadingInfo(false);
      }
    };
    fetchInfo();
  }, []);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await submitInquiry(values);
      toast.success("Inquiry submitted successfully!");
      reset({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Reach out to our customer care or submit your custom desktop builds query below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info & Maps Column */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Smart Click Showroom</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-800 dark:text-white">Store Address</span>
                  <span className="text-sm">{info.address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-800 dark:text-white">Phone Number</span>
                  <span className="text-sm">{info.phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-800 dark:text-white">Email Address</span>
                  <span className="text-sm">{info.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-800 dark:text-white">Showroom Hours</span>
                  <span className="text-sm">{info.businessHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Integration */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-72">
            <iframe
              title="Smart Click Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.975765955681!2d79.8596637!3d6.8934789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMzYuNSJONzkgNTEnMzQuOCJF!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Inquiry Form Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold mb-6">Send an Inquiry</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className={`w-full text-sm border rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-800"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  className={`w-full text-sm border rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email pattern" },
                  })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="message">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                placeholder="Write your message here..."
                rows="5"
                className={`w-full text-sm border rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.message ? "border-red-500 focus:ring-red-500" : "border-slate-200 dark:border-slate-800"
                }`}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-semibold transition disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? "Submitting..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
