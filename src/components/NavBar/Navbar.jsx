import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa6';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link } from 'react-scroll';
import card from '../../assets/card logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <img className="h-16 w-auto" src={card} alt="Folk Cargo Logo" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Folk Cargo Solutions Pvt. Ltd.
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">About</Link>
          <Link to="services" smooth={true} duration={500} offset={-70} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Services</Link>
          <Link to="contact" smooth={true} duration={500} offset={-70} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Contact Icons */}
        <div className="hidden md:flex items-center gap-4 text-2xl text-gray-700 dark:text-gray-300">
          <a href="tel:+919254992649" title="Call" className="hover:text-indigo-500 transition">
            <FaPhone />
          </a>
          <a href="mailto:folkcargosolutions@gmail.com" title="Email" className="hover:text-blue-600 transition">
            <FaEnvelope />
          </a>
          <a href="https://wa.me/919254992649" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:text-green-500 transition">
            <FaWhatsapp />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="text-3xl text-gray-800 dark:text-white" />
            ) : (
              <HiMenuAlt3 className="text-3xl text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-4 text-gray-800 dark:text-white">
            <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer hover:text-blue-600 transition">About</Link>
            <Link to="services" smooth={true} duration={500} offset={-70} className="cursor-pointer hover:text-blue-600 transition">Services</Link>
            <Link to="contact" smooth={true} duration={500} offset={-70} className="cursor-pointer hover:text-blue-600 transition">Contact</Link>

            {/* Mobile Contact Buttons */}
            <div className="flex gap-4 pt-4 text-2xl">
              <a href="tel:+919254992649" title="Call" className="hover:text-indigo-500 transition">
                <FaPhone />
              </a>
              <a href="mailto:folkcargosolutions@gmail.com" title="Email" className="hover:text-blue-600 transition">
                <FaEnvelope />
              </a>
              <a href="https://wa.me/919254992649" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:text-green-500 transition">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
