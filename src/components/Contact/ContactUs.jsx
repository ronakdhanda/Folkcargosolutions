import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .sendForm(
        'service_qxbqp0t',          // Your service ID
        'template_my14nbg',         // Your main contact template ID
        formRef.current,
        'gqSxXYrwE8fuD6RHg'         // Your public API key
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          formRef.current.reset();
        },
        (error) => {
          console.error('Email error:', error);
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <section id="contact" className="relative py-20 px-6 md:px-16 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-4rem] right-[-4rem] w-[280px] h-[280px] bg-gradient-to-br from-fuchsia-500 via-red-400 to-yellow-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute bottom-[-4rem] left-[-4rem] w-[280px] h-[280px] bg-gradient-to-tr from-indigo-400 via-blue-500 to-teal-400 rounded-full opacity-20 blur-3xl z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center bg-white/60 dark:bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
          Contact Us
        </h2>
        <p className="text-neutral-800 dark:text-neutral-200 text-lg mb-10">
          We'd love to hear from you. Reach out via the form below and we’ll get back to you shortly!
        </p>

        <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 gap-6 max-w-2xl mx-auto text-left">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/80 dark:bg-white/10 backdrop-blur text-neutral-900 dark:text-white"
          />
          <input
            type="email"
            name="email"  // ✅ This must match the auto-reply "To Email" field
            placeholder="Your Email"
            required
            className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/80 dark:bg-white/10 backdrop-blur text-neutral-900 dark:text-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/80 dark:bg-white/10 backdrop-blur text-neutral-900 dark:text-white"
          ></textarea>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg"
          >
            Send Message
          </motion.button>
          {status && (
            <p className="text-sm text-center pt-2 text-neutral-700 dark:text-neutral-300">
              {status}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
