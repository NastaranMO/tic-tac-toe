import React from 'react'
import './index.css'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
    transition: { duration: 1.5, delay: .1 }
  }
}

const Status = ({ players, isTurn }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='players-list-container'
    >
      <hr />
      <ul className='players-list'>
        {players.map(player =>
          <motion.li
            animate={{ scale: player.turn ? 1.3 : 1, originX: 0, type: 'spring' }}
            transition={{ duration: .4 }}
            key={player.id}
            className='players-list__item'>
            {player.turn ?
              <span> 🟢{' '}<b>{player.username}</b></span>
              : <span> 🔴{' '}<b>{player.username}</b></span>}
          </motion.li>)
        }
      </ul>
    </motion.div>
  )
}

export default Status