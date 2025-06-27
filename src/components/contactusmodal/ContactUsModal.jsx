import React, { useState } from 'react';
import { FiMap, FiMail, FiPhone, FiCopy, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ContactUsModal = () => {
  const address =
    'Office No. I, L-96, Shubhraj Complex, Old Rangpuri Road, Mahipalpur Ext., New Delhi - 110037';

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-10 px-4">
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Google Map */}
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d438.1087655740537!2d77.124076!3d28.5436232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c156d47610f%3A0xccb52a4779e5423e!2sSubhraj%20Complex!5e0!3m2!1sen!2sin!4v1750946734492!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg border-2 border-neutral-300 dark:border-neutral-600"
        />

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-5 text-neutral-800 dark:text-neutral-200">
          {/* Address with copy icon */}
          <div className="flex items-start gap-4">
            <FiMap className="text-blue-600 text-xl mt-1" />
            <div className="flex flex-col">
              <span>{address}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm text-blue-500 mt-1 hover:underline"
              >
                {copied ? (
                  <>
                    <FiCheck /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy Address
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <FiMail className="text-teal-500 text-xl" />
            <a
              href="mailto:folkcargosolutions@gmail.com"
              className="hover:underline"
            >
              folkcargosolutions@gmail.com
            </a>
          </div>

          {/* Phone with call link */}
          <div className="flex items-center gap-4">
            <FiPhone className="text-green-600 text-xl" />
            <a
              href="tel:+919254992649"
              className="hover:underline"
            >
              +91 9254992649
            </a>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919254992649"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 mt-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold w-fit transition"
          >
            <FaWhatsapp className="text-xl" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUsModal;
