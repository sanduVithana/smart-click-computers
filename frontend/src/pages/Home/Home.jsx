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
  Quote,
  Zap,
  ChevronRight
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
        setFeatured(featRes.data.slice(0, 4)); // show top 4 featured
        setLatest(latRes.data.slice(0, 8)); // show top 8 latest
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
    { title: "Genuine Products", desc: "100% authentic computer hardware sourced from official distributors.", icon: ShieldCheck, color: "text-blue-600 dark:text-blue-400 bg-blue-500/10" },
    { title: "Competitive Prices", desc: "Direct import rates delivering the best price-to-performance ratio.", icon: CircleDollarSign, color: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" },
    { title: "Technical Support", desc: "Professional system configuration, custom cabling, and desktop repairs.", icon: Wrench, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10" },
    { title: "Warranty Support", desc: "Hassle-free local returns and official brand warranty coverage.", icon: BadgeAlert, color: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
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
    { name: "Damith Perera", role: "Software Engineer", comment: "The custom liquid-cooled PC they assembled is an absolute beast. Outstanding clean cable management and benchmark testing support.", stars: 5 },
    { name: "Shashini Fernando", role: "Graphic Designer", comment: "Bought a color-accurate 4K monitor. The tech advisors actually took their time verifying color gamut compatibility with my MacBook.", stars: 5 },
    { name: "Irshad Ahamed", role: "Competitive Gamer", comment: "Great selection of gaming mice and mechanical keyboards. Delivery was extremely fast and the prices are the best in Colombo.", stars: 5 },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24 pb-20 overflow-hidden"
    >
      {/* 1. Hero Banner with Ambient Glowing Orbs */}
      <section className="relative bg-slate-950 text-white py-28 md:py-36 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Background Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
        
        {/* Dot pattern matrix overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
            <Zap className="h-3 w-3 fill-current animate-bounce" />
            <span>Sri Lanka's Premium PC Accessories Showroom</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent"
          >
            Elevate Your PC <br className="hidden sm:inline" /> Performance
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
          >
            We supply high-performance graphics cards, components, keyboards, gaming mice, and custom accessories for builders and enthusiasts who demand perfection.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              to="/products"
              className="group flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] font-semibold transition duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Accessories</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto justify-center px-8 py-4 bg-slate-900/60 hover:bg-slate-900 text-white rounded-2xl border border-slate-800 font-semibold transition duration-300 backdrop-blur-md"
            >
              Custom PC Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built On Trust and Precision</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            We provide exceptional quality products, direct importer pricing, and expert hardware diagnostics support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform"></div>
                <div className={`p-3.5 rounded-2xl w-fit ${feat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mt-5 mb-2.5">{feat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Product Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse Accessories</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Locate key computing components quickly.</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 group">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
                <motion.div key={cat._id} variants={itemVariants} whileHover={{ y: -4 }}>
                  <Link
                    to={`/products?category=${cat._id}`}
                    className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl text-center shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300"
                  >
                    <div className="p-3.5 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="mt-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 truncate w-full">{cat.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Featured Showcase (With Glow accents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Gear</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Handpicked computer accessories and best sellers.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 group">
            <span>Shop Catalog</span>
            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <ProductSkeletonGrid count={4} />
        ) : featured.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No featured products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Latest Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Newly added parts, processors, and peripheral items.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 group">
            <span>View All Arrivals</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {loading ? (
          <ProductSkeletonGrid count={8} />
        ) : latest.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No arrivals found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latest.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Testimonials Section (Clean visual glassmorphic deck) */}
      <section className="bg-slate-100 dark:bg-slate-900/40 py-20 border-y border-slate-200/40 dark:border-slate-800/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Trusted By Over 500+ Gamers & Pros</h2>
            <p className="text-slate-500 dark:text-slate-400">Real feedback from clients who custom built desktops with us.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-slate-100 dark:text-slate-800/50 pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm">{test.name}</h4>
                  <span className="text-xs text-slate-400">{test.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Preview Card (Premium glowing background banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Glowing orbs overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/25 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-2xl space-y-6 z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Need expert compatibility advice?</h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Submit your parts list or build preferences. Our technical support specialists will verify compatibility, wattage loads, and dimensions.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-slate-50 text-blue-600 rounded-2xl shadow-lg font-bold transition duration-300 transform hover:-translate-y-0.5"
              >
                <span>Submit Compatibility Check</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
