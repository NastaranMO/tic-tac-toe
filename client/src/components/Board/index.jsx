import React, { useState, useEffect } from 'react'
import MainPage from '../MainPage'
import Game from '../Game'

const Board = ({ isGameBegin, socket, username, player, setPlayer, addPlayers }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('new_player_connected', (data) => {
      console.log('data is coming', data);
      setPlayers(data);
      addPlayers(data)
    });

  }, [socket]);

  console.log('players from board==>', players)
  console.log('player from board==>', player)

  return (
    <div>
      <MainPage player={player} isCurrentPlayer={true} setPlayers={setPlayers} setPlayer={setPlayer} />
      {isGameBegin
        &&
        <Game players={players} setPlayers={setPlayers} player={player} socket={socket} username={player.username} />
      }
    </div>
  )
}

export default Board