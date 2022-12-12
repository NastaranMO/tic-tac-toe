import React from 'react'
import './index.css'
import { animate, motion } from 'framer-motion'
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'

const Cell = ({ cell, moveHandler, id, isTurn }) => {
  return (
    <motion.button
      initial={{ y: '100vw' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, delay: .1 }}
      className={cell !== '' ? 'cell cell-disable' : 'cell'}
      onClick={() => moveHandler(id)}
      disabled={(cell !== '' || !isTurn) && true}
    >
      {cell === 'X' && <X />}
      {cell === 'O' && <O />}
    </motion.button>
  )
}

export default Cell