import React, { useEffect, useState } from "react";
import { getBusinessInfo, updateBusinessInfo } from "../../services/businessService";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../../components/Loading/Loading";
import { Save, Store, Mail, MapPin, Clock, Phone, Globe, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuth();
  
  // Page States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
    businessHours: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getBusinessInfo();
        if (data) {
          setFormData({
            businessName: data.businessName || "",
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || "",
            businessHours: data.businessHours || "",
          });
          setSocialLinks({
            facebook: data.socialLinks?.facebook || "",
            instagram: data.socialLinks?.instagram || "",
            twitter: data.socialLinks?.twitter || "",
            linkedin: data.socialLinks?.linkedin || "",
            youtube: data.socialLinks?.youtube || "",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load business information settings");
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        ...formData,
        socialLinks,
      };

      await updateBusinessInfo(updateData, user.token);
      toast.success("Business information saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save configuration settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Shop Settings</h2>
        <p className="text-sm text-slate-500">Configure public business details, contact information, and hours</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: General Shop Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>General Settings</span>
            </h3>

            {/* Shop name */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="businessName">Shop Name *</label>
              <input
                id="businessName"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleTextChange}
                placeholder="e.g. Smart Click Computers"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold" htmlFor="address">Showroom Address *</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleTextChange}
                placeholder="e.g. No. 123, Galle Road, Colombo 03, Sri Lanka"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telephone */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold flex items-center space-x-1" htmlFor="phone">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Phone Number *</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleTextChange}
                  placeholder="e.g. +94 11 234 5678"
                  className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold flex items-center space-x-1" htmlFor="email">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Address *</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  placeholder="e.g. sales@smartclick.com"
                  className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Showroom Hours */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold flex items-center space-x-1" htmlFor="businessHours">
                <Clock className="h-3.5 w-3.5" />
                <span>Showroom Working Hours</span>
              </label>
              <textarea
                id="businessHours"
                name="businessHours"
                value={formData.businessHours}
                onChange={handleTextChange}
                placeholder="e.g. Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: Closed"
                rows="2"
                className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Social links settings & save buttons */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Social Media Accounts</span>
            </h3>

            {/* Facebook */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500" htmlFor="facebook">Facebook Link</label>
              <input
                id="facebook"
                type="text"
                name="facebook"
                value={socialLinks.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500" htmlFor="instagram">Instagram Link</label>
              <input
                id="instagram"
                type="text"
                name="instagram"
                value={socialLinks.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/yourpage"
                className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Twitter */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500" htmlFor="twitter">Twitter Link</label>
              <input
                id="twitter"
                type="text"
                name="twitter"
                value={socialLinks.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/yourpage"
                className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Youtube */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500" htmlFor="youtube">YouTube Link</label>
              <input
                id="youtube"
                type="text"
                name="youtube"
                value={socialLinks.youtube}
                onChange={handleSocialChange}
                placeholder="https://youtube.com/channel"
                className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? "Saving Configurations..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
