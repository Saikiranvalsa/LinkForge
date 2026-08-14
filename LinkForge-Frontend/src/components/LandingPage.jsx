import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLink,
  FaChartLine,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {
    navigate("/dashboard");
  };
  const createShortLinkHandler = () => {
  navigate("/dashboard", {
    state: { openCreateShortUrl: true },
  });
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 text-slate-900 overflow-hidden">

      {/* Hero Section */}
      <section className="relative px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 lg:pt-20 pb-16">

        {/* Background decoration */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 max-w-7xl mx-auto flex lg:flex-row flex-col lg:gap-16 gap-12 items-center">

          {/* Left Section */}
          <div className="flex-1 w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6"
            >
              <FaLink className="text-xs" />
              Smart URL Management
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-bold tracking-tight text-slate-900 md:text-6xl sm:text-5xl text-4xl md:leading-[1.1] sm:leading-[1.15] leading-[1.2] max-w-3xl"
            >
              Shorten your links.
              <span className="block text-blue-600">
                Track every click.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-slate-600 text-base sm:text-lg leading-7 mt-6 max-w-2xl"
            >
              LinkForge makes URL management simple and powerful. Create
              short, shareable links, manage them from one place, and monitor
              click activity through a clean analytics dashboard.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8"
            >

              {/* Create Short Link */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={createShortLinkHandler}
                className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200"
              >
                Create Short Link
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Manage Links */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={dashBoardNavigateHandler}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200"
              >
                Manage Links
              </motion.button>

            </motion.div>

            {/* Small stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 mt-9 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Secure authentication
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Real-time click tracking
              </div>
            </motion.div>

          </div>

          {/* Right Section */}
          <div className="flex-1 w-full flex justify-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative w-full max-w-[520px]"
            >

              {/* Image background */}
              <div className="absolute inset-0 bg-blue-600/10 rounded-[2rem] rotate-3 scale-95" />

              <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-300/40 p-3 sm:p-5">

                <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="w-full object-cover rounded-2xl"
                  src="/images/img2.png"
                  alt="LinkForge URL Shortener"
                />

                {/* Floating analytics card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -right-4 sm:-right-8 bottom-8 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FaChartLine className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Click Analytics
                    </p>
                    <p className="font-bold text-slate-900">
                      Track your links
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-5 sm:px-8 lg:px-14 py-16 bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
              Why LinkForge?
            </span>

            <h2 className="text-slate-900 font-bold text-3xl sm:text-4xl mt-3">
              Everything you need to manage your links
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              Create, organize, secure, and analyze your shortened URLs from
              one simple platform.
            </p>
          </motion.div>

          <div className="grid lg:gap-6 gap-5 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1">

            <Card
              title="Simple URL Shortening"
              desc="Create short and easy-to-share URLs in just a few clicks. LinkForge converts long URLs into compact and memorable links."
            />

            <Card
              title="Click Analytics"
              desc="Monitor your link performance by recording click events and viewing click activity through the LinkForge analytics dashboard."
            />

            <Card
              title="Secure Authentication"
              desc="Protect your account and links with secure authentication powered by Spring Security and JWT-based authorization."
            />

            <Card
              title="Fast Redirects"
              desc="Quickly redirect visitors from shortened URLs to their original destinations while keeping your links easy to share and manage."
            />

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 sm:px-8 lg:px-14 py-16 bg-slate-900">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >

          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <FaBolt className="text-white text-xl" />
            </div>
          </div>

          <h2 className="text-white font-bold text-3xl sm:text-4xl">
            Ready to simplify your links?
          </h2>

          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Create your first shortened URL and start tracking your link
            performance with LinkForge.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={dashBoardNavigateHandler}
            className="mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            Get Started
          </motion.button>

        </motion.div>

      </section>

    </div>
  );
};

export default LandingPage;