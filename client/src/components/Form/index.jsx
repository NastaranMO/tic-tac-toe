import './style.css'
import React, { useState } from 'react'
import axios from 'axios'
import Header from '../Header'


function Form({ addPlayers, socket, setPlayer }) {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('');

  const joinGameSubmitHandler = async (e) => {
    e.preventDefault()
    if (username !== '' && room !== '') {
      socket.emit('join_game', { room, username });
      const { data } = await axios.get('http://localhost:3001/game');
      // const rightPlayers = data.filter(p => p.room === room)
      addPlayers(data)
      setPlayer(prev => ({ ...prev, room }))
    }
  };

  return (
    <div className='form-container'>
      <Header />
      <form onSubmit={joinGameSubmitHandler} className="form">
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
        <label htmlFor='room' className='form__label'>Room</label>
        <input
          type="text"
          id="room"
          className='form__input'
          onChange={(e) => setRoom(e.target.value)}
          placeholder="123..."
        />
        <button type="submit" className='form__btn'>Enter</button>
      </form>
    </div>
  )
}

export default Form