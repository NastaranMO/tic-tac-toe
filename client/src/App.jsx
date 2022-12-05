import './App.css';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game from './components/Game';
import Header from './components/Header';
import Board from './components/Board';
import Login from './components/Login';
import axios from 'axios'

const socket = io.connect('http://localhost:3001');

const checkIsGameBegin = (players) => players.length === 2
const getData = () => JSON.parse(localStorage.getItem('tic-tac-toe')) || '';
const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))



function App() {
  const [player, setPlayer] = useState('');
  // const [players, setPlayers] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const [isGameBegin, setIsGameBegin] = useState(false)
  // const [isOpponentDisconnect, setIsOpponentDisconnect] = useState(false);

  // const addPlayers = (data) => {
  //   setPlayers(data);
  //   const currentPlayer = data.find(p => p.username === player.username)
  //   if (currentPlayer) setPlayer(currentPlayer)
  //   if (checkIsGameBegin(data)) setIsGameBegin(true);

  //   setShowGame(true);
  // }

  const addPlayers = (data) => {
    // setPlayers(data);
    const currentPlayer = data.players?.find(p => p.username === player.username)
    if (currentPlayer) setPlayer(currentPlayer)
    if (checkIsGameBegin(data.players)) setIsGameBegin(true);

    setShowGame(true);
  }

  // console.log('players from App.js===>', players)

  useEffect(() => {
    const playerData = getData()
    if (playerData) {
      setPlayer(playerData)
      setShowGame(true)
      socket.emit('connect-game', playerData);
    }

  }, []);

  return (
    <main>
      <Header />
      {
        showGame
          ?
          <Board
            player={player}
            setPlayer={setPlayer}
            socket={socket}
            username={player.username}
            isGameBegin={isGameBegin}
            addPlayers={addPlayers}

          />
          :
          <Login setPlayer={setPlayer} store={store} getData={getData} setShowGame={setShowGame} />
      }
    </main>
  );
}

export default App;
{/* <Form addPlayers={addPlayers} socket={socket} setPlayer={setPlayer} /> */ }
{/* <Game players={players} setPlayers={setPlayers} player={player} socket={socket} username={player.username} /> */ }
