import React, { useState, useEffect } from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'
import { motion } from 'framer-motion'
import hasGameStart from '../../utils/game'

const Main = ({ player, setPlayers, addPlayers, setIsGameBegin, socket }) => {
  const [isOpponant, setIsOpponant] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/game/${player.username}`);
    if (!data) {
      socket.emit('connect-game', { ...player, isBegin: false });
      socket.emit('start_game', player.username);
      setIsOpponant(true)
    }
  }

  useEffect(() => {
    socket.on('start', (data) => {
      setPlayers(data.players)
      addPlayers(data)

      if (hasGameStart(data.players)) {
        setShowTimer(true)
        const timeoutId = setTimeout(() => {
          setIsGameBegin(true)
          setIsOpponant(false)
        }, 6000);

        return () => clearTimeout(timeoutId)
      }
    })
  }, [socket])

  return (
    <div className='box-container'>
      <Profile player={player} />
      <form onSubmit={joinRoomOnSubmitHandler}>
        <motion.button
          type="submit"
          className='box-btn--match'
          whileHover={{ scale: !isOpponant ? 1.04 : 1 }}
          disabled={isOpponant ? true : false}
        >
          {isOpponant ? 'Looking for apponant...' : 'Find a match'}
        </motion.button>
      </form>
      {isOpponant && <div>Waiting for apponant...</div>}
      {showTimer &&
        <motion.div
          animate={{ scale: 1.2 }}
          transition={{ repeat: 20, duration: 1.2 }}
          className="timer"
        >
          <h2>Waiting for join...</h2>
        </motion.div>}
    </div>
  )
}

export default Main