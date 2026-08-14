import React from "react";
import { motion } from "framer-motion";
import {
  FaLink,
  FaShareAlt,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const AboutPage = () => {
  const features = [
    {
      icon: <FaLink />,
      title: "Simple URL Shortening",
      description:
        "Create short and easy-to-share URLs in just a few clicks. LinkForge converts long URLs into compact and memorable links.",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FaShareAlt />,
      title: "Link Management",
      description:
        "Manage your shortened URLs from one place. Copy links, access original URLs, and keep your links organized.",
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Authentication",
      description:
        "LinkForge uses Spring Security and JWT-based authentication to protect user accounts and user-specific resources.",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <FaChartLine />,
      title: "Click Analytics",
      description:
        "Track the performance of your shortened URLs through click events and visualize activity using the LinkForge analytics dashboard.",
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 text-slate-900">

      {/* Hero Section */}
      <section className="relative px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-16 overflow-hidden">

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
              <FaLink className="text-xs" />
              About LinkForge
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              One place to
              <span className="block text-blue-600">
                manage your links.
              </span>
            </h1>

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-8">
              LinkForge is a URL shortening and analytics platform designed
              to make link sharing simple, efficient, and manageable. Create
              shortened URLs, organize your links, track click activity, and
              view useful analytics from one convenient platform.
            </p>

          </motion.div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mt-14">

            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${feature.iconStyle}`}
                >
                  {feature.icon}
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h2>

                <p className="mt-3 text-slate-500 leading-7">
                  {feature.description}
                </p>

              </motion.div>
            ))}

          </div>

          {/* Technology Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-8 bg-slate-900 rounded-3xl p-7 sm:p-10 text-white"
          >

            <div className="max-w-3xl">

              <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                Built with modern technologies
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                Built for secure and reliable link management
              </h2>

              <p className="text-slate-400 mt-4 leading-7">
                LinkForge combines a modern React frontend with a Java
                Spring Boot backend, Spring Security, JWT authentication,
                Spring Data JPA, and MySQL to provide a secure and reliable
                URL management experience.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  React.js
                </span>

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  Java
                </span>

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  Spring Boot
                </span>

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  Spring Security
                </span>

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  JWT
                </span>

                <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
                  MySQL
                </span>

              </div>

            </div>

          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;