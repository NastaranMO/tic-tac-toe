import React, { useState, useEffect } from 'react'
import MainPage from '../MainPage'
import Game from '../Game'

const Board = ({ socket, player, setPlayer, addPlayers }) => {
  const [players, setPlayers] = useState([]);
  const [isGameBegin, setIsGameBegin] = useState(false)

  useEffect(() => {
    socket.on('user_left', () => {
      setPlayers([])
      setIsGameBegin(false)
    })
  }, [socket, isGameBegin]);

  return (
    <div>
      {!isGameBegin
        ?
        <MainPage
          setPlayers={setPlayers}
          player={player}
          addPlayers={addPlayers}
          setIsGameBegin={setIsGameBegin}
          socket={socket}
        />
        :
        <Game
          players={players}
          setPlayer={setPlayer}
          setPlayers={setPlayers}
          player={player}
          socket={socket}
          username={player.username}
          setIsGameBegin={setIsGameBegin}
        />
      }
    </div>
  )
}

export default Board