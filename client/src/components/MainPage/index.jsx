import React from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'
import { isDragActive, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'

const checkIsGameBegin = (players) => players.length === 2

const Main = ({ player, players, setPlayers, setPlayer, addPlayers, setIsGameBegin, socket, isGameBegin }) => {
  // console.log('From Main compomnent', players, player)
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
      console.log('start========>', data)
      setPlayers(data.players)
      addPlayers(data)
      if (data.players && checkIsGameBegin(data.players)) {
        setShowTimer(true)
        setTimeout(() => {
          console.log('Why.......................')
          setIsGameBegin(true)
          setIsOpponant(false)
        }, 6000);
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
          transition={{ yoyo: 20, duration: 1.2 }}
          className="timer"
        >
          <h2>Waiting for join...</h2>
        </motion.div>}
    </div>
  )
}

export default Main