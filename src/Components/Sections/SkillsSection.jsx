import React, { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../utils/helper';

const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const skillBarVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: '0.3',
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      id='skills'
      className={`py-24 px-6 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
        } relative overflow-hidden transition-all duration-500`}
    >
      <motion.div style={{ y }} className='absolute inset-0 overflow-hidden'>
        <div className={`absolute top-40 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'}`} />
        <div className={`absolute bottom-40 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
          }`} />
      </motion.div>

      <div className='max-w-6xl mx-auto relative z-10'>
        <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='text-center mb-20'
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
              } mb-4`}
          >
            Technical Experiense
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='text-3xl md:text-5xl font-light mb-6'
          >
            Skills &
            <span className='text-blue-500 font-medium'>Technologies</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-2xl mx-auto font-light`}
          >
            A comprehensive toolkit for building modern, scalable web applications from concept to deployment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection