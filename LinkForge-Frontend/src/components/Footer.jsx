import React from "react";
import {
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-custom-gradient text-white py-8 z-40 relative">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">

        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">LinkForge</h2>
          <p>Simplifying URL shortening and link analytics</p>
        </div>

        <p className="mt-4 lg:mt-0">
          &copy; 2026 LinkForge. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 lg:mt-0">

          {/* Gmail */}
          <a
            href="mailto:valsasaikiran26@gmail.com"
            className="hover:text-gray-200 transition-all duration-200"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>

          {/* Portfolio */}
          <a
            href="https://saikiranvalsa.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-all duration-200"
            aria-label="Portfolio"
          >
            <FaGlobe size={24} />
          </a>

          {/* Instagram */}
          <a
            href="YOUR_INSTAGRAM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-all duration-200"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/saikiran-valsa-2a891a288/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;