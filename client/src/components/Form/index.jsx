import React, { useState } from 'react'
import axios from 'axios'


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
    <form onSubmit={joinGameSubmitHandler}>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
          setPlayer({ username: e.target.value })
        }}
        placeholder="John..."
      />
      <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        placeholder="123..."
      />
      <button type="submit">Enter</button>
    </form>
  )
}

export default Form