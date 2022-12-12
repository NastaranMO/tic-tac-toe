import './App.css';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Header from './components/Header';
import Board from './components/Board';
import Login from './components/Login';

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const getData = () => JSON.parse(localStorage.getItem('tic-tac-toe')) || '';
const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))


function App() {
  const [player, setPlayer] = useState('');
  const [showGame, setShowGame] = useState(false);

  const addPlayers = (data) => {
    const currentPlayer = data.players?.find(p => p.username === player.username)
    if (currentPlayer) setPlayer(currentPlayer)
    setShowGame(true);
  }

  useEffect(() => {
    const playerData = getData()
    if (playerData) {
      setPlayer(playerData)
      setShowGame(true)
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
            addPlayers={addPlayers}
          />
          :
          <Login setPlayer={setPlayer} store={store} getData={getData} setShowGame={setShowGame} />
      }
    </main>
  );
}

export default App;
