import React from 'react'
import './index.css'

const Timer = ({ showTimer }) => {
  if (showTimer > 5) return null

  return (
    <div className='timer-container'>
      {showTimer}
    </div>
  )
}

export default Timer