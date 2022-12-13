import React, { useEffect, useState } from 'react'
import './index.css'
import { motion } from 'framer-motion'

const Timer = () => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setTimer(prev => prev + 1)
    }, 1000)

    return () => clearTimeout(timeId)
  })
  return (
    <div className='timer-container'>
      <p>Waiting ...</p>
      <motion.div
        className='timer-circle'
        animate={{ scale: 1.5 }}
        transition={{ repeat: 20, duration: 1 }}
      >
        <div>{timer}</div>
      </motion.div>
    </div>
  )
}

export default Timer