import React, { useState, useEffect } from 'react'
import MainPage from '../MainPage'
import Game from '../Game'

const Board = ({ socket, player, setPlayer, addPlayers }) => {
  const [players, setPlayers] = useState([]);
  const [isGameBegin, setIsGameBegin] = useState(false)

  useEffect(() => {
    socket.on('new_player_connected', (data) => {
      console.log('data is coming', data);
      setPlayers(data.players);
      addPlayers(data, setIsGameBegin)
    });

    socket.on('user_left', () => {
      setPlayers([])
      setIsGameBegin(false)
    })

  }, [socket]);

  console.log('players from board==>', players)
  console.log('player from board==>', player)

  return (
    <div>
      {!isGameBegin
        ?
        <MainPage
          isCurrentPlayer={true}
          setPlayers={setPlayers}
          player={player}
          setPlayer={setPlayer}
          addPlayers={addPlayers}
          setIsGameBegin={setIsGameBegin}
        />
        :
        <Game
          players={players}
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