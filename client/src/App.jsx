import './App.css';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import Header from './components/Header';
import Board from './components/Board';
import Login from './components/Login';
import { store, getData } from './utils/store'

const socket = io.connect(process.env.REACT_APP_BASE_URL);

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
