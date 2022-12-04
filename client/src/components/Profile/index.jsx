import React from 'react'

export const Profile = ({ player, isCurrentPlayer }) => {
  const { username, turn, symbol } = player
  return (
    <div>
      <b>{isCurrentPlayer ? 'You:' : 'Opponent:'}{' '} {username}</b>
      <b>{' '}{symbol}</b>
      <br />
      <label>{turn ? 'Your turn' : ''}</label>
    </div>
  )
}
