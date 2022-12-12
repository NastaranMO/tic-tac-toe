import React from 'react'
import './index.css'
import { motion } from 'framer-motion'

const Profile = ({ player }) => {
  return (
    <div
      className='profile'
    >
      <div className='profile__text'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >Welcome back, {player.username}!</motion.h1>
        <p className='profile__text--paragraf'>This project designed and developed with Nodejs, Socket io and React.</p>
      </div>
      <div className='profile__boxItems'>
        <b className='profile-item profile-item--pink'>Total: {player.total}</b>
        <b className='profile-item profile-item--win'>Win: {player.win}</b>
        <b className='profile-item profile-item--lose'>Lose: {player.lost}</b>
        <b className='profile-item profile-item--draw'>Draw: {player.draw}</b>
      </div>
    </div>
  )

}

export default Profile
