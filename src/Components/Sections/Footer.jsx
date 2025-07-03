import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useRef } from 'react';
import { containerVariants, itemVariants } from '../../utils/helper';
import { Code2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/data';

const Footer = () => {

  const { isDarkMode } = useTheme();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // define social links ??

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animated Gradient Line Component
  const AnimatedGradientLine = () => (
    <div className='absolute top-0 left-0 w-full h-px overflow-hidden'>
      <motion.div
        className={`h-px bg-gradient-to-r ${isDarkMode ? 'from-transparent via-blue-500 to-transparent' : 'from-transparent via-blue-600 to-transparent'
          }`}
        initial={{ width: '0%', opacity: 0 }}
        animate={isInView ? { width: '100%', opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute top-0 h-px w-32 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 via-purple-500 to-blue-400' : 'from-blue-500 via-purple-600 to-blue-500'
          } blur-sm`}
        animate={{
          x: ['-50%', 'calc(100vw + 50%)']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 6,
            ease: 'linear',
            delay: 1,
          }
        }}
      />
    </div>
  )

  return (
    <footer
      ref={footerRef}
      className={`relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} overflow-hidden`}
    >
      {/* Animated Wave/Gradient Line */}
      <AnimatedGradientLine />

      {/* BackGround element */}
      <motion.div
        style={{ y: scrollY }}
        className='absolute inset-0 overflow-hidden pointer-events-none'
      >
        <div className={`absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-3 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'}`} />
        <div className={`absolute top-10 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-3 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'}`} />
      </motion.div>

      <div className='relative z-10 py-16'>
        <div className='max-w-6xl mx-auto'>
          {/* main Footer content */}
          <motion.div
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className='text-center space-y-8'
          >

            {/* Logo/brand */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <motion.div
                className='inline-flex items-center space-x-2 text-2xl font-medium'
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className='text-blue-500'
                >
                  <Code2 size={28} />
                </motion.div>
                <span>Iman Langaran</span>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}
              >
                Crafting digital Experiences with passion, presision, and touch of magic.
              </motion.p>
            </motion.div>

            {/* Social Link */}
            <motion.div variants={itemVariants} className='flex justify-center space-x-6'>
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100/50 hover:bg-gray-200/50'
                    } ${social.color} backdrop-blur-sm`}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    rotate: [0, -5, 5, 0]
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.1 + 0.5,
                    type: 'spring',
                    stiffness: 300
                  }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

          </motion.div>
        </div>

      </div>


    </footer>
  )
}

export default Footer