import React from 'react'
import './index.css'
import Profile from '../Profile'

const Main = ({ player }) => {
  console.log('From profile compomnent', player)

  const joinRoomOnSubmitHandler = (e) => {
    e.preventDefault();

  }

  return (
    <div className='box-container'>
      <Profile player={player} />
      <form onSubmit={joinRoomOnSubmitHandler}>
        <button className='box-btn'>Find a match</button>
      </form>
    </div>
  )
}

export default Main