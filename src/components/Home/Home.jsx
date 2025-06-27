import React from 'react'
import { motion } from "framer-motion"
import { HERO_CONTENT } from '../../constrants'
import profilePic from '../../assets/4.jpg'
import { Typewriter } from 'react-simple-typewriter';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay }
  }
})

export const Home = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-white via-slate-100 to-white dark:from-black dark:via-neutral-900 dark:to-black">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[300px] h-[300px] bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 dark:from-purple-600 dark:via-pink-500 dark:to-blue-600 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[300px] h-[300px] bg-gradient-to-r from-teal-200 via-sky-200 to-cyan-200 dark:from-teal-500 dark:via-sky-400 dark:to-cyan-500 rounded-full blur-3xl opacity-20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight"
          >
            Folk Cargo Solutions <br className="hidden md:inline" />
            <span className="text-slate-500 dark:text-slate-400">Private Limited</span>
          </motion.h1>

          <motion.span
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-sky-400 to-violet-500"
          >
            <Typewriter
              words={[ 'From Clearance to Delivery — We Make It Simple ','We Move. You Grow.', 'Global Freight Experts.', 'Reliable. Efficient. Everywhere.']}
              loop={true}
              autoStart={true}
              cursor
              cursorStyle='|'
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </motion.span>

          <motion.p
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            {HERO_CONTENT}
          </motion.p>
        </div>

        {/* Image Section */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="relative group">
            <img
              src={profilePic}
              alt="Folk Cargo"
              className="h-72 w-72 md:h-96 md:w-96 rounded-full object-cover border-[5px] border-neutral-300 dark:border-neutral-800 shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-violet-500/20 blur-2xl z-[-1] group-hover:blur-3xl transition-all duration-500" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
