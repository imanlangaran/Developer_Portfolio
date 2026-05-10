import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { PROJECTS } from './utils/data';
import NotFound from './NotFound';
import { AnimatePresence } from 'framer-motion';

const ProjectDetail = () => {
  const { id }= useParams();

  const project = PROJECTS.find((project) => project.id === parseInt(id!) )
  
  if(!project) return <NotFound />

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}  // Forces re-animation when ID changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='bg-white'
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1>{project.title}</h1>
          <img src={project.image} />
          <p>{project.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectDetail