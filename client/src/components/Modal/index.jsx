import React from 'react'
import './index.css'

const Modal = ({ showModal, winner, setIsGameBegin }) => {
  if (!showModal) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Winner is {winner}, restart game?</h2>
        </div>
        <div className='modal-body'>
          <button className='modal-btn' onClick={() => {
            setIsGameBegin(false)
            // window.location.href = '/'
          }}>Go to profile</button>
        </div>
      </div>
    </div>
  )
}

export default Modal