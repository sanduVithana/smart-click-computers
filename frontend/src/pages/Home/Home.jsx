import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ProductSkeletonGrid } from "../../components/Loading/Loading";
import {
  ShieldCheck,
  CircleDollarSign,
  Wrench,
  BadgeAlert,
  ArrowRight,
  Monitor,
  Gamepad,
  HardDrive,
  Cpu,
  Star,
  Quote
} from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featRes, latRes, catRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products/featured"),
          axios.get("http://localhost:5000/api/products/latest"),
          axios.get("http://localhost:5000/api/categories"),
        ]);
        setFeatured(featRes.data);
        setLatest(latRes.data);
        setCategories(catRes.data.slice(0, 6)); // show top 6 categories
      } catch (err) {
        console.error("Error loading home page resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const features = [
    { title: "Genuine Products", desc: "100% authentic devices & computer accessories from top brands.", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
    { title: "Competitive Prices", desc: "Direct importer rates ensuring budget-friendly tech upgrades.", icon: CircleDollarSign, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
    { title: "Technical Support", desc: "Expert on-site hardware diagnosis and custom desktop builds.", icon: Wrench, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20" },
    { title: "Warranty Support", desc: "Official distributor warranties for complete peace of mind.", icon: BadgeAlert, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
  ];

  const categoryIcons = {
    monitors: Monitor,
    keyboards: Gamepad,
    mice: Gamepad,
    laptops: Monitor,
    processors: Cpu,
    ssds: HardDrive,
  };

  const testimonials = [
    { name: "Damith Perera", role: "Software Engineer", comment: "Bought a custom desktop. Technical support is top-notch, pricing was very competitive.", stars: 5 },
    { name: "Shashini Fernando", role: "Graphic Designer", comment: "Excellent service. Got a professional monitor and a set of cables. Fully genuine products.", stars: 5 },
    { name: "Irshad Ahamed", role: "Gamer", comment: "Best shop for gaming peripherals. Highly recommend their mechanical keyboards!", stars: 5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 pb-16"
    >
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        {/* Animated grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider"
          >
            <span>Welcome to Smart Click Computers</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent leading-tight"
          >
            Empower Your Digital Workspace
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-slate-300"
          >
            Discover genuine PC components, high-performance gaming peripherals, and premium IT accessories at the most competitive rates.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              to="/products"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-semibold transition"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 font-semibold transition"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Smart Click?</h2>
          <p className="text-slate-500 dark:text-slate-400">
            We provide exceptional quality, verified products, and reliable technical solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className={`p-3 rounded-xl w-fit ${feat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mt-4 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Product Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Find accessory components sorted for easy lookup.</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const matchedKey = cat.name.toLowerCase();
              let Icon = Cpu;
              for (const [k, icon] of Object.entries(categoryIcons)) {
                if (matchedKey.includes(k)) {
                  Icon = icon;
                  break;
                }
              }

              return (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat._id}`}
                  className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center hover:border-blue-500 dark:hover:border-blue-400 transition"
                >
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-sm font-semibold truncate w-full">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Curated showcase of our best selling items.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
            <span>Shop Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <ProductSkeletonGrid count={4} />
        ) : featured.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No featured products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Latest Arrivals</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Newly stocked components and computer upgrades.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
            <span>View All Arrivals</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <ProductSkeletonGrid count={4} />
        ) : latest.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No arrivals found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latest.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Testimonials Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Customer Testimonials</h2>
            <p className="text-slate-500 dark:text-slate-400">Hear from our clients about their hardware upgrades.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-100 dark:text-slate-800 pointer-events-none" />
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-4">"{test.comment}"</p>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">{test.name}</h4>
                  <span className="text-xs text-slate-400">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Preview Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.8),transparent_50%)]"></div>
          <div className="relative max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold">Have an inquiry or custom PC request?</h2>
            <p className="text-blue-100">
              Get in touch with our tech advisors for compatibility assistance, quotation details, or special stock orders.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 rounded-xl shadow-md font-semibold transition"
              >
                <span>Submit Inquiry</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
