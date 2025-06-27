import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bolt, Users, Globe2, Clock, CheckCircle2, Star } from 'lucide-react'; // Icon imports

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const coreValues = [
  { icon: <ShieldCheck className="text-purple-400" />, title: "Reliability", desc: "We deliver what we promise, every time." },
  { icon: <CheckCircle2 className="text-green-400" />, title: "Integrity", desc: "Transparency and honesty guide all our operations." },
  { icon: <Users className="text-blue-400" />, title: "Customer-Centricity", desc: "Your cargo is our top priority." },
  { icon: <Bolt className="text-yellow-400" />, title: "Innovation", desc: "We embrace technology to optimize logistics." },
  { icon: <Clock className="text-red-400" />, title: "Speed & Efficiency", desc: "We move fast without compromising quality." },
  { icon: <Globe2 className="text-teal-400" />, title: "Global Mindset, Local Care", desc: "Personal attention with global reach." },
  { icon: <Star className="text-pink-400" />, title: "Compliance & Safety", desc: "Every shipment meets global standards." },
];

const Goals = () => {
  return (
    <section className="py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Mission */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-blue-400 to-violet-500">
            Our Mission
          </h2>
          <p className="mt-4 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            To simplify global logistics by providing reliable, efficient, and transparent freight solutions—connecting businesses to the world through ocean, air, land, and customs expertise.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-sky-400 to-fuchsia-400">
            Our Vision
          </h2>
          <p className="mt-4 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            To create a world where shipping is no longer a challenge, but a competitive advantage for every business we serve.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="backdrop-blur-sm bg-white/40 dark:bg-white/10 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-md text-left transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  {val.icon}
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-white">{val.title}</h3>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default Goals;

