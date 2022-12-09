import React from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'
import { motion } from 'framer-motion'

const Main = ({ player, setPlayers, setPlayer, addPlayers, setIsGameBegin }) => {
  console.log('From Main compomnent', player)

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();
    // socket.emit('join_game', { room, username });
    const { data } = await axios.get(`http://localhost:3001/game/${player.username}`);
    setPlayers(data.players)
    addPlayers(data, setIsGameBegin)
  }

  return (
    <div className='box-container'>
      <Profile player={player} />
      <form onSubmit={joinRoomOnSubmitHandler}>
        <motion.button
          type="submit"
          className='box-btn--match'
          whileHover={{ scale: 1.04 }}
        >
          Find a match
        </motion.button>
      </form>
    </div>
  )
}

export default Main