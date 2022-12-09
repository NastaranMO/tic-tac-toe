import React from 'react'
import './index.css'
import { motion } from 'framer-motion'

const Profile = ({ player }) => {
  console.log('player in profile', player)
  return (
    <div
      className='profile'
    >
      <div className='profile__text'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >Welcome, {player.username}!</motion.h1>
        <p className='profile__text--paragraf'>This project designed and developed with Nodejs, Socket io and React.</p>
      </div>
      <div className='profile__boxItems'>
        <p className='profile-item profile-item--pink'>Total: {player.total}</p>
        <p className='profile-item profile-item--win'>Win: {player.win}</p>
        <p className='profile-item profile-item--lose'>Lose: {player.lost}</p>
        <p className='profile-item profile-item--draw'>Draw: {player.draw}</p>
      </div>
    </div>
  )

}

export default Profile
