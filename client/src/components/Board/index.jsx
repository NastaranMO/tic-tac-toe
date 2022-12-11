import React, { useState, useEffect } from 'react'
import MainPage from '../MainPage'
import Game from '../Game'

const Board = ({ socket, player, setPlayer, addPlayers }) => {
  const [players, setPlayers] = useState([]);
  const [isGameBegin, setIsGameBegin] = useState(false)
  const [start, setStart] = useState(false)

  const timerHandler = () => {
    setTimeout(() => {

    }, 5000);
  }

  useEffect(() => {
    socket.on('new_player_connected', (data) => {
      console.log('data is coming', data);
      // setPlayers(data.players);
      // addPlayers(data)
    });

    socket.on('user_left', () => {
      console.log('user left')
      setPlayers([])
      setIsGameBegin(false)
    })

    // if (players.length === 2) setIsGameBegin(true)

  }, [socket, isGameBegin]);

  // console.log('players from board==>', players)
  // console.log('player from board==>', player)
  // console.log('is game begin?==>', isGameBegin)

  return (
    <div>
      {!isGameBegin
        ?
        <MainPage
          isCurrentPlayer={true}
          isGameBegin={isGameBegin}
          setPlayers={setPlayers}
          player={player}
          players={players}
          setPlayer={setPlayer}
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