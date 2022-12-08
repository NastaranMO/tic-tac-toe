import React from 'react'
import './index.css'
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'

const Cell = ({ cell, moveHandler, id }) => {
  return (
    <button
      className={cell !== '' ? 'cell cell-disable' : 'cell'}
      onClick={() => moveHandler(id)}
    >
      {cell === 'X' && <X />}
      {cell === 'O' && <O />}
    </button>
  )
}

export default Cell