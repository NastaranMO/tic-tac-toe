import React from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'
import { motion } from 'framer-motion'

const checkIsGameBegin = (players) => players.length === 2

const Main = ({ player, setPlayers, setPlayer, addPlayers, setIsGameBegin, socket }) => {
  console.log('From Main compomnent', player)

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();
    socket.emit('connect-game', player);
    // socket.emit('join_game', { room, username })
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/game/${player.username}`);
    setPlayers(data.players)
    addPlayers(data)
    if (data.players && checkIsGameBegin(data.players)) {
      console.log('Why.......................')
      setIsGameBegin(true)
    }
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