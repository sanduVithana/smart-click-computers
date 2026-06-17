import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, FolderOpen, Mail, Sparkles, MessageCircle, AlertCircle, ChevronRight, Check } from "lucide-react";
import { Spinner } from "../../components/Loading/Loading";
import { updateInquiryStatus } from "../../services/inquiryService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: 0,
    unreadInquiries: 0,
    featured: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [prodRes, catRes, inqRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/categories"),
        axios.get("http://localhost:5000/api/inquiries", {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);

      const products = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.products || [];
      const categories = Array.isArray(catRes.data) ? catRes.data : catRes.data.categories || [];
      const inquiries = Array.isArray(inqRes.data) ? inqRes.data : inqRes.data.data || [];

      const unreadCount = inquiries.filter((inq) => inq.status === "unread").length;
      const featuredCount = products.filter((p) => p.featured).length;

      setStats({
        products: products.length,
        categories: categories.length,
        inquiries: inquiries.length,
        unreadInquiries: unreadCount,
        featured: featuredCount,
      });

      setRecentInquiries(inquiries.slice(0, 4));
      setCategoriesList(categories);
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user.token]);

  const handleMarkRead = async (id) => {
    try {
      await updateInquiryStatus(id, "read", user.token);
      toast.success("Inquiry marked as read");
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_40%)]"></div>
        <div className="relative space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold">Hello, {user?.username || "Admin"}!</h2>
          <p className="text-sm text-slate-400">Here's what's happening at Smart Click Computers today.</p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <Link to="/admin/products" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</span>
            <span className="block text-2xl font-bold">{stats.products}</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
            <Box className="h-6 w-6" />
          </div>
        </Link>

        {/* Categories */}
        <Link to="/admin/categories" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</span>
            <span className="block text-2xl font-bold">{stats.categories}</span>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl">
            <FolderOpen className="h-6 w-6" />
          </div>
        </Link>

        {/* Inquiries */}
        <Link to="/admin/inquiries" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unread Inquiries</span>
            <span className="block text-2xl font-bold flex items-center space-x-2">
              <span>{stats.unreadInquiries}</span>
              {stats.unreadInquiries > 0 && (
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full animate-ping"></span>
              )}
            </span>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl">
            <Mail className="h-6 w-6" />
          </div>
        </Link>

        {/* Featured */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Featured Items</span>
            <span className="block text-2xl font-bold">{stats.featured}</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-xl">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>Recent Inquiries</span>
            </h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
              <span>All Inquiries</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500">No customer inquiries found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInquiries.map((inq) => (
                <div
                  key={inq._id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    inq.status === "unread"
                      ? "bg-red-50/20 dark:bg-red-950/5 border-red-200 dark:border-red-900/30"
                      : "bg-slate-50/50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{inq.name}</span>
                      <span className="text-xs text-slate-400">({inq.email})</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {inq.status === "unread" ? (
                      <button
                        onClick={() => handleMarkRead(inq._id)}
                        className="flex items-center space-x-1 text-xs font-semibold bg-red-100 hover:bg-red-200 dark:bg-red-950/50 text-red-800 dark:text-red-400 px-3 py-1.5 rounded-lg transition"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Mark Read</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold px-3 py-1.5">Read</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Visualization SVG Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
          <h3 className="text-lg font-bold">Category Shares</h3>
          
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            {/* Direct Premium SVG donut chart */}
            <svg width="160" height="160" viewBox="0 0 42 42" className="transform -rotate-90">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border)" strokeWidth="4"></circle>
              {/* Blue segment: representing products */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#2563eb"
                strokeWidth="4"
                strokeDasharray="65 35"
                strokeDashoffset="0"
              ></circle>
              {/* Amber segment: representing featured */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="20 80"
                strokeDashoffset="-65"
              ></circle>
            </svg>

            {/* Legend info */}
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 bg-blue-600 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Regular Items</span>
                </div>
                <span className="font-semibold">{Math.max(0, stats.products - stats.featured)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 bg-amber-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Featured Items</span>
                </div>
                <span className="font-semibold">{stats.featured}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}