import React from 'react'
import './index.css'

const Status = ({ players }) => {
  console.log('players from status', players)
  return (
    <ul className='players-list'>
      {players.map(player =>
        <li key={player.id} className='players-list__item'>
          {player.turn
            ? <span>🟩{' '}{player.username}</span>
            : <span>{player.username}{' '}⬜️</span>
          }
        </li>)
      }
    </ul>
  )
}

export default Status