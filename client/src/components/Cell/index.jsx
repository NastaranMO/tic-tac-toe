import React from 'react'
import './index.css'
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'

const Cell = ({ cell, moveHandler, id, isTurn }) => {
  return (
    <button
      className={cell !== '' ? 'cell cell-disable' : 'cell'}
      onClick={() => moveHandler(id)}
      disabled={(cell !== '' || !isTurn) && true}
    >
      {cell === 'X' && <X />}
      {cell === 'O' && <O />}
    </button>
  )
}

export default Cell