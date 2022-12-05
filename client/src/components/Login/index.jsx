import React from 'react'
import './index.css'
import Header from '../Header';
import { useState } from 'react';
import { useEffect } from 'react';



const Login = ({ setPlayer, store, setShowGame }) => {
  const [username, setUsername] = useState('')

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    store({ username });
    setShowGame(true)
  }

  return (
    <div className='form-container'>
      <Header />
      <form className='form' onSubmit={loginSubmitHandler}>
        <label htmlFor='name' className='form__label'>Name</label>
        <input
          type="text"
          id="name"
          className='form__input'
          onChange={(e) => {
            setUsername(e.target.value);
            setPlayer({ username: e.target.value })
          }}
          placeholder="John..."
        />
        <button type="submit" className='form__btn'>Enter</button>
      </form>
    </div>

  )
}

export default Login