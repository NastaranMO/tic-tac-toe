import React, { useState, useEffect } from 'react'
import MainPage from '../MainPage'
import Game from '../Game'

const Board = ({ isGameBegin, socket, username, player }) => {
  const [players, setPlayers] = useState([player]);
  // console.log('players:', players)
  // const joinRoomOnSubmitHandler = (e) => {
  //   e.preventDefault();

  // }
  useEffect(() => {
    socket.on('new_player_joined', (data) => {
      console.log('data is coming', data);
      setPlayers(data);
      const currentPlayer = data.find(p => p.username === player.username)
      if (currentPlayer) setPlayer(currentPlayer)
    });

  }, [socket]);

  return (
    <div>
      {/* {players?.map((p, i) => <Profile key={i} player={p} isCurrentPlayer={true} />)} */}
      <MainPage player={player} isCurrentPlayer={true} />
      {/* <form onSubmit={joinRoomOnSubmitHandler}>
        <button className='box-btn'>Find a match</button>
      </form> */}
      {isGameBegin
        &&
        <Game players={players} setPlayers={setPlayers} player={player} socket={socket} username={player.username} />
      }
    </div>
  )
}

export default Board