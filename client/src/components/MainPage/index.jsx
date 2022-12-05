import React from 'react'
import './index.css'
import Profile from '../Profile'
import axios from 'axios'

const Main = ({ player, setPlayers, setPlayer, addPlayers }) => {
  console.log('From Main compomnent', player)

  const joinRoomOnSubmitHandler = async (e) => {
    e.preventDefault();
    // socket.emit('join_game', { room, username });
    const { data } = await axios.get(`http://localhost:3001/game/${player.username}`);
    setPlayers(data.players)
    addPlayers(data)
  }

  return (
    <div className='box-container'>
      <Profile player={player} />
      <form onSubmit={joinRoomOnSubmitHandler}>
        <button type="submit" className='box-btn'>Find a match</button>
      </form>
    </div>
  )
}

export default Main