import './index.css'
import { ReactComponent as Logo } from '../../assests/logo.svg';
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.div
      className='header-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .5, duration: 1.2 }}
    >
      <Logo />
    </motion.div>
  )
}

export default Header