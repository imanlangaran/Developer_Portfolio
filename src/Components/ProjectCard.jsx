// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ProjectCard = ({ project, index, isDarkMode }) => {
  const cardVaiants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      }
    }
  };

  return <motion.div
    variants={cardVaiants}
    whileHover={{
      y: -8,
      transition: { diration: 0.3, ease: 'easeOut' }
    }}
    className='group relative'
  >
    <div
      className={`rounded-full overflow-hidden border transition-all duration-500 ${isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10' : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-blue-500/10'
        } backdrop-blur-sm`}
    >
      <div className=''>
        <img
          src={project.image}
          alt={project.title}
          className=''
        />

        {project.featured && (
          <div className=''>
            <span className=''>
              Featured
            </span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
}

export default ProjectCard