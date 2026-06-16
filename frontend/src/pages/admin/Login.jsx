import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Cpu, Lock, Mail, AlertCircle } from "lucide-react";
import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setFormError("");
    try {
      const data = await loginAPI(values);
      login(data);
      toast.success("Welcome back, Administrator!");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Invalid email or password. Please try again.";
      setFormError(msg);
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl shadow-2xl space-y-8 relative z-10"
      >
        {/* Brand/Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-2xl mb-2">
            <Cpu className="h-8 w-8 text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">SmartClick Admin</h2>
          <p className="text-sm text-slate-400">Sign in to manage product catalogs and inquiries</p>
        </div>

        {formError && (
          <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-xl flex items-start space-x-2 text-sm text-red-200">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-300" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="admin@smartclick.com"
                className={`w-full text-sm pl-10 pr-3 py-3 rounded-xl bg-slate-900/50 border text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-slate-700"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email pattern" },
                })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-300" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full text-sm pl-10 pr-10 py-3 rounded-xl bg-slate-900/50 border text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-slate-700"
                }`}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
              >
                {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition disabled:opacity-50 mt-2 flex justify-center items-center"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Smart Click Computers Showroom · Admin Session Only
        </p>
      </motion.div>
    </div>
  );
}