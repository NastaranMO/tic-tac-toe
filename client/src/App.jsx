import './App.css';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game from './components/Game';
import Header from './components/Header';
import Board from './components/Board';
import Login from './components/Login';
import axios from 'axios'
// import Modal from './components/Modal';

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const checkIsGameBegin = (players) => players.length === 2

const getData = () => JSON.parse(localStorage.getItem('tic-tac-toe')) || '';
const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))

function App() {
  const [player, setPlayer] = useState('');
  const [showGame, setShowGame] = useState(false);

  const addPlayers = (data, setIsGameBegin) => {
    const currentPlayer = data.players?.find(p => p.username === player.username)
    if (currentPlayer) setPlayer(currentPlayer)

    if (data.players && checkIsGameBegin(data.players)) setIsGameBegin(true);

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
      {/* <div style={{ color: 'black', backgroundColor: 'red', width: '100%' }}>djfj</div> */}
      <Header />
      {
        showGame
          ?
          <Board
            player={player}
            setPlayer={setPlayer}
            socket={socket}
            addPlayers={addPlayers}
          />
          :
          <Login setPlayer={setPlayer} store={store} getData={getData} setShowGame={setShowGame} />
      }
    </main>
  );
}

export default App;
