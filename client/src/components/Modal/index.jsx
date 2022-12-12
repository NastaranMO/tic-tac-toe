import React from 'react'
import './index.css'

const Modal = ({ showModal, winner, setIsGameBegin, player }) => {
  if (!showModal) return null

  const generateMessage = () => {
    if (winner === 'draw') return '🫥 Draw... Play again? 🫥 '
    if (player.symbol === winner) return '🎈 You won... Play again? 🎈'
    return `👾 You lost... Play again? 👾`
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{generateMessage()}</h2>
        </div>
        <div className='modal-body'>
          <button className='modal-btn' onClick={() => {
            setIsGameBegin(false)
          }}>Go to profile</button>
        </div>
      </div>
    </div>
  )
}

export default Modal