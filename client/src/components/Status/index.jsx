import React from 'react'
import './index.css'
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'
import { ReactComponent as XOutline } from '../../assests/icon-x-outline.svg'
import { ReactComponent as OOutline } from '../../assests/icon-o-outline.svg'
import { motion } from 'framer-motion'

const Status = ({ players, isTurn }) => {
  console.log('players from status', players, isTurn)
  return (
    <motion.div
      initial={{ y: '-100vw' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, delay: .1 }}
      className='players-list-container'
    >
      <ul className='players-list players-list--bottom'>
        {players.map(player =>
          <li key={player.id} className='players-list__item'>
            {player.symbol === 'X'
              ? 'X'
              : 'O'
            }
          </li>)
        }
      </ul>
      <ul className='players-list'>
        {players.map(player =>
          <li key={player.id} className='players-list__item'>
            {player.turn ?
              <span> 🟢{' '}<b>{player.username}</b></span>
              : <span> 🔴{' '}<b>{player.username}</b></span>}
          </li>)
        }
      </ul>
    </motion.div>
  )
}

export default Status