import React, { useState, useEffect } from 'react'
import './index.css'
import Profile from '../Profile'
import Timer from '../Timer'
import axios from 'axios'
import { motion } from 'framer-motion'
import hasGameStart from '../../utils/game'

const Main = ({ player, setPlayers, addPlayers, setIsGameBegin, socket }) => {
  const [isOpponant, setIsOpponant] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [opponent, setOpponent] = useState('')
  const [error, setError] = useState('')

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();
    setError('')
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/game/${player.username}`);
    if (!data) {
      socket.emit('connect-game', { ...player, isBegin: false });
      socket.emit('start_game', player.username);
      setTimeout(async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${player.username}`);
        if (data.players.length !== 2) {
          await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${player.username}`);
          setIsOpponant(false)
          setError('We could not find any match, please try again!')
        }
      }, 21000);
      setIsOpponant(true)
    }
  }

  useEffect(() => {
    socket.on('start', (data) => {
      setPlayers(data.players)
      addPlayers(data)

      if (hasGameStart(data.players)) {
        setShowJoin(true)
        setIsOpponant(false)
        const opponent = data.players.find(p => p.username !== player.username)
        setOpponent(opponent.username)
        const timeoutId = setTimeout(() => {
          setIsGameBegin(true)
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
          {isOpponant ? 'Looking for apponent...' : 'Find a match'}
        </motion.button>
      </form>
      <br />
      {isOpponant && <Timer />}
      <div>Why?</div>
      {error && error}
      {showJoin &&
        <motion.div
          animate={{ scale: 1.2 }}
          transition={{ repeat: 20, duration: 1.2 }}
          className="timer"
        >
          <h2>Please waiting for join...</h2>
          <p>Your opponent is <b>{opponent}</b></p>
        </motion.div>}
    </div>
  )
}

export default Main