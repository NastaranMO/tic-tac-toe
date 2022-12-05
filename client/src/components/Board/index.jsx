import React, { useState, useEffect } from 'react'
import { Profile } from '../Profile'
import Game from '../Game'

const Board = ({ isGameBegin, socket, username, player }) => {
  const [players, setPlayers] = useState([player]);
  // console.log('players:', players)

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
      <Profile player={player} isCurrentPlayer={true} />
      {isGameBegin
        &&
        <Game players={players} setPlayers={setPlayers} player={player} socket={socket} username={player.username} />
      }
    </div>
  )
}

export default Board