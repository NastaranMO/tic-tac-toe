import React from 'react'
import './index.css'

export const Profile = ({ player }) => {
  console.log('From profile compomnent', player)

  return (
    // <div className='profile-container'>
    <div className='profile'>
      <div className='profile__text'>
        <h1>Welcome, {player.username}!</h1>
        <p className='profile__text--paragraf'>This project designed and developed with Nodejs, Socket io and React.</p>
      </div>
      <div className='profile__boxItems'>
        <p className='profile-item profile-item--pink'>Total: {player.win}</p>
        <p className='profile-item profile-item--win'>Win: {player.win}</p>
        <p className='profile-item profile-item--lose'>Lose: {player.lost}</p>
        <p className='profile-item profile-item--draw'>Draw: {player.draw}</p>
      </div>
      {/* </div> */}
      {/* <button>Join to a room</button> */}
    </div>
  )

}
