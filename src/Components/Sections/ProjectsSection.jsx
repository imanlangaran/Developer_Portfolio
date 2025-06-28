import { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '../../utils/helper';

const ProjectsSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id='work'
      ref={sectionRef}
      className={`py-24 px-6 ${isDarkMode ?
        'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} 
        relative overflow-hidden transition-all duration-500`}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}
        />
        <div
          className={`absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
            }`}
        />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>

        <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='text-center mb-2'
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
              } mb-4`}
          >
            Featured Work
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='text-3xl md:text-5xl font-light mb-6'
          >
            Recent
            <span className='text-blue-500 font-medium'> Projects</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-2xl mx-auto font-light`}
          >
            A collection of projects that showcase my experiense in building modern web application and solving complex problems.
          </motion.p>
        </motion.div>

      </div>

    </section>
  )
}

export default ProjectsSection