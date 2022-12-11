import React from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'
import { motion } from 'framer-motion'

const checkIsGameBegin = (players) => players.length === 2

const Main = ({ player, players, setPlayers, setPlayer, addPlayers, setIsGameBegin, socket }) => {
  console.log('From Main compomnent', players, player)

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('clicked here')

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/game/${player.username}`);
    console.log(data)
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