
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useRef, useState } from 'react';

const ContactSection = () => {
  const { isDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => { };

  return (
    <section
      id='contact'
      ref={sectionRef}
      className={`py-24 px-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } relative overflow-hidden`}
    >

      {/* background elements */}
      <motion.div style={{ y }} className='absolute inset-0 overflow-hidden'>
        <div
          className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}
        />
        <div
          className={`absolute bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
            }`}
        />
      </motion.div>

      <div className='max-w-6xl mx-auto relative z-10'>

      </div>

    </section>
  )
}

export default ContactSection