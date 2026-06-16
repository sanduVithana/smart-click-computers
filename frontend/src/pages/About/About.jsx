import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, Compass, Award, Users, Heart } from "lucide-react";

export default function About() {
  const values = [
    { title: "Customer Centric", desc: "We align our inventory and advisory support directly with customer upgrade paths.", icon: Heart, color: "text-red-500 bg-red-50 dark:bg-red-950/20" },
    { title: "Technical Expertise", desc: "Our technicians hold verified system builder credentials and provide genuine recommendations.", icon: Cpu, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
    { title: "Quality Guarantee", desc: "Every cable, RAM, processor, and peripheral is guaranteed 100% original and verified.", icon: Award, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
  ];

  const team = [
    { name: "Pradeep Gamage", role: "Founder & Lead Advisor", bio: "Over 12 years of enterprise hardware acquisition and computer retail expertise.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" },
    { name: "Kasun Silva", role: "Senior Hardware Specialist", bio: "Custom gaming desktop designer and component compatibility consultant.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200" },
    { name: "Nuwan Bandara", role: "Technical Support Engineer", bio: "System diagnostics expert and warranty liaison specialist.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-16"
    >
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.3),transparent_40%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About Smart Click Computers</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Providing high-quality hardware and reliable IT components to tech enthusiasts, gamers, and businesses.
          </p>
        </div>
      </section>

      {/* History and Vision Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Our Journey</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Smart Click Computers was established to bridge the gap between high-end international hardware distribution and local consumers in Sri Lanka. Starting as a small storefront, we have scaled into a trusted tech advisor providing desktop customization, graphics cards, motherboards, processors, and peripheral accessories.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Our business model is built on one simple foundation: **quality without compromises**. We deal strictly in original boxed components, ensuring that customers get the lifespan, warranty support, and performance stability they pay for.
          </p>
        </div>

        <div className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Mission */}
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Our Mission</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                To supply consumers and businesses with verified, high-performance IT equipment backed by authentic warranties and expert customer care.
              </p>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Vision */}
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Our Vision</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                To be the primary destination for custom computing builds, system upgrades, and authentic IT peripheral sales across Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-slate-500 dark:text-slate-400">The standards we live by to serve our customers daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${val.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{val.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Our Tech Experts</h2>
          <p className="text-slate-500 dark:text-slate-400">Meet the advisors and specialists behind Smart Click.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition text-center p-6 flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="h-28 w-28 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-sm"
              />
              <h3 className="text-lg font-bold mt-4 text-slate-800 dark:text-white">{member.name}</h3>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{member.role}</span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed italic">"{member.bio}"</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
