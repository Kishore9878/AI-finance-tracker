import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  statsData,
  featuresData,
  howItWorksData,
  testimonialsData,
} from "../data/landingData";

const Landing = () => {

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" />;

  return (
    <div className="bg-white">

      {/* 🔷 NAVBAR */}
      <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b sticky top-0 bg-white z-50">
        <h1 className="text-xl font-bold text-blue-600">Welth</h1>

        <div className="flex gap-4 md:gap-6 items-center">
          <a href="#features" className="text-gray-600 hover:text-black text-sm md:text-base">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-black text-sm md:text-base">Testimonials</a>

          <Link
            to="/login"
            className="border px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
          >
            Login
          </Link>
        </div>
      </div>

      {/* 🔷 HERO */}
      <motion.div
        className="text-center px-6 py-16 md:py-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Manage Your Finances <br /> with Intelligence
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
          AI-powered platform to track, analyze and optimize your spending.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Link
            to="/register"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <button className="border px-6 py-3 rounded-lg">
            Watch Demo
          </button>
        </div>

        <img
          src="/banner.jpeg"
          alt="banner"
          className="mt-12 mx-auto rounded-xl shadow-lg w-full max-w-5xl px-2"
        />
      </motion.div>

      {/* 🔷 STATS */}
      <motion.div
        className="bg-blue-50 py-12 grid grid-cols-2 md:grid-cols-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {statsData.map((item, i) => (
          <div key={i}>
            <h2 className="text-xl md:text-2xl font-bold text-blue-600">
              {item.value}
            </h2>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        ))}
      </motion.div>

      {/* 🔷 FEATURES */}
      <motion.div
        id="features"
        className="py-16 px-6 md:px-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-10">
          Everything you need to manage your finances
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((item, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="mb-3">{item.icon}</div>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 🔷 HOW IT WORKS */}
      <motion.div
        className="bg-blue-50 py-16 text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-10">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {howItWorksData.map((item, i) => (
            <div key={i} className="max-w-xs">
              <div className="bg-white p-4 rounded-full shadow inline-block mb-3">
                {item.icon}
              </div>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 🔷 TESTIMONIALS */}
      <motion.div
        id="testimonials"
        className="py-16 px-6 md:px-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-10">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((t, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full mx-auto mb-3"
              />

              <p className="text-gray-500 text-sm">
                {t.quote}
              </p>

              <h4 className="mt-4 font-semibold">{t.name}</h4>
              <p className="text-xs text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 🔷 CTA */}
      <div className="bg-blue-600 text-white text-center py-16 px-6">
        <h2 className="text-xl md:text-2xl font-semibold">
          Ready to Take Control of Your Finances?
        </h2>

        <p className="mt-2 text-sm">
          Join thousands of users managing finances smarter
        </p>

        <Link
          to="/register"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg"
        >
          Start Free Trial
        </Link>
      </div>

    </div>
  );
};

export default Landing;