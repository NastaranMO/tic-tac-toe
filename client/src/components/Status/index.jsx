import React from 'react'
import './index.css'
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'
import { ReactComponent as XOutline } from '../../assests/icon-x-outline.svg'
import { ReactComponent as OOutline } from '../../assests/icon-o-outline.svg'

const Status = ({ players }) => {
  console.log('players from status', players)
  return (
    <>
      {/* <ul className='players-list players-list--bottom'>
        {players.map(player =>
          <li key={player.id} className='players-list__item'>
            {player.symbol === 'X'
              ? 'X'
              : 'O'
            }
          </li>)
        }
      </ul> */}
      <ul className='players-list'>
        {players.map(player =>
          <li key={player.id} className='players-list__item'>
            {player.turn ?
              <span> 🟢{' '}{player.username}</span>
              : <span> {player.username}{' '}🔴</span>}
          </li>)
        }
      </ul>
    </>
  )
}

export default Status