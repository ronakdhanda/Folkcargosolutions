import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section id='about' className="relative py-20 px-6 md:px-16 overflow-hidden">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-pink-500 to-blue-400 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-[300px] h-[300px] bg-gradient-to-tr from-teal-400 via-cyan-500 to-blue-500 rounded-full opacity-20 blur-3xl z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center bg-white/60 dark:bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 mb-6">
          About Us
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed"
        >
          At <strong>Folk Cargo Solutions Pvt. Ltd.</strong>, we specialize in seamless <strong>customs clearance services</strong> for businesses of all sizes. With deep regulatory expertise and real-time coordination across ports and customs offices, we ensure your goods cross borders efficiently and without delay.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed mt-6"
        >
          Our licensed experts handle all documentation, duty compliance, and coordination with port authorities, so you don’t have to worry about disruptions. Whether it's imports or exports, we make global trade simpler, faster, and more transparent—because when your cargo moves smoothly, your business thrives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-left max-w-xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-sky-600 mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-neutral-800 dark:text-neutral-200">
            <li className="flex items-start gap-3">
              <FaRegCheckCircle className="text-green-500 mt-1" />
              End-to-end customs clearance management
            </li>
            <li className="flex items-start gap-3">
              <FaRegCheckCircle className="text-green-500 mt-1" />
              Real-time tracking and regulatory compliance
            </li>
            <li className="flex items-start gap-3">
              <FaRegCheckCircle className="text-green-500 mt-1" />
              Experienced team with global logistics know-how
            </li>
            <li className="flex items-start gap-3">
              <FaRegCheckCircle className="text-green-500 mt-1" />
              Fast, efficient, and transparent process
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
