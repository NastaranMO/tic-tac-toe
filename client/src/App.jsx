import './App.css';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game1 from './components/Game';
import Login from './components/Login';

const socket = io.connect('http://localhost:3001');

const checkIsGameBegin = (players) => players.length === 2
const getData = () => JSON.parse(localStorage.getItem('tic-tac-toe')) || '';
const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))



function App() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const [isGameBegin, setIsGameBegin] = useState(false)
  // const [isOpponentDisconnect, setIsOpponentDisconnect] = useState(false);

  const addPlayers = (data) => {
    setPlayers(data);
    const currentPlayer = data.find(p => p.username === player.username)
    if (currentPlayer) setPlayer(currentPlayer)
    if (checkIsGameBegin(data)) setIsGameBegin(true);

    setShowGame(true);
  }

  console.log('players from App.js===>', players)

  useEffect(() => {
    const data = getData()
    if (data) {
      console.log('data', data)
      setShowGame(true)
    }
    socket.on('new_player_joined', (data) => {
      console.log('data is coming', data);
      // const rightPlayes = data.filter(p => p.room === player.room)
      setPlayers(data);
      const currentPlayer = data.find(p => p.username === player.username)
      if (currentPlayer) setPlayer(currentPlayer)
    });

  }, [socket]);

  return (
    <main>
      {
        showGame
          ? <Game1 players={players} setPlayers={setPlayers} player={player} socket={socket} username={player.username} />
          :
          <Login setPlayer={setPlayer} store={store} setShowGame={setShowGame} />
      }

    </main>
  );
}

export default App;
{/* <Form addPlayers={addPlayers} socket={socket} setPlayer={setPlayer} /> */ }
