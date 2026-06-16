import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBusinessInfo } from "../../services/businessService";
import { Cpu, Phone, Mail, MapPin, Clock } from "lucide-react";

// Inline social SVGs for build stability
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export default function Footer() {
  const [info, setInfo] = useState({
    businessName: "Smart Click Computers",
    address: "No. 123, Galle Road, Colombo, Sri Lanka",
    phone: "+94 11 234 5678",
    email: "info@smartclick.com",
    businessHours: "Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: Closed",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
    },
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getBusinessInfo();
        if (data) setInfo(data);
      } catch (err) {
        console.error("Failed to load footer business info:", err);
      }
    };
    fetchInfo();
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider text-blue-400">
              <Cpu className="h-6 w-6 text-blue-400" />
              <span>Smart<span className="text-white">Click</span></span>
            </Link>
            <p className="text-sm text-slate-400">
              Your premier destination for high-quality computer accessories, custom gaming PCs, and genuine laptop components in Sri Lanka.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {info.socialLinks?.facebook && (
                <a href={info.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {info.socialLinks?.instagram && (
                <a href={info.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-pink-600 hover:text-white rounded-lg transition" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {info.socialLinks?.twitter && (
                <a href={info.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-lg transition" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {info.socialLinks?.youtube && (
                <a href={info.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-red-600 hover:text-white rounded-lg transition" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition">Products</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Store Hours</h3>
            <div className="flex items-start space-x-2 text-sm text-slate-400">
              <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <span>{info.businessHours}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Get in Touch</h3>
            <div className="flex items-start space-x-2 text-sm text-slate-400">
              <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <span>{info.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Phone className="h-5 w-5 text-blue-400 shrink-0" />
              <span>{info.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Mail className="h-5 w-5 text-blue-400 shrink-0" />
              <span>{info.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {info.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
