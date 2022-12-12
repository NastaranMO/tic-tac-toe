import React, { useState } from 'react'
import './index.css'
import { motion } from 'framer-motion'
import { store } from '../../utils/store'
import { v4 as uuid } from 'uuid'



const Login = ({ setPlayer, setShowGame }) => {
  const [username, setUsername] = useState('')

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const newPlayer = { clientId: uuid(), username, win: 0, lost: 0, draw: 0, total: 0 }
    setPlayer(newPlayer)
    store(newPlayer);

    setShowGame(true)
  }

  return (
    <motion.div
      className='form-container'
      initial={{ y: -150 }}
      animate={{ y: 10 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
    >
      <form className='form' onSubmit={loginSubmitHandler}>
        <label htmlFor='name' className='form__label'>
          Enter your name
        </label>
        <input
          type="text"
          id="name"
          className='form__input'
          onChange={(e) => setUsername(e.target.value)}
          placeholder="John..."
        />
        <button
          type="submit"
          className='form__btn'
        >Enter</button>
      </form>
    </motion.div>

  )
}

export default Login