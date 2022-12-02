import './App.css';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game1 from './components/Game1';

const socket = io.connect('http://localhost:3001');

const checkIsGameBegin = (players) => players.length === 2

function App() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const [isGameBegin, setIsGameBegin] = useState(false)
  const [isOpponentDisconnect, setIsOpponentDisconnect] = useState(false);

  const addPlayers = (data) => {
    setPlayers(data);
    if (checkIsGameBegin(data)) setIsGameBegin(true);

    setShowGame(true);
  }

  console.log('players from App.js===>', players)

  useEffect(() => {
    socket.on('new_player_joined', (data) => {
      console.log('data is coming', data);
      setPlayers(data);
    });

    socket.on('disconnect_recieved', (data) => {
      setPlayers(data);
      console.log('Your opponent left the game')
      setIsOpponentDisconnect(true)
    });
  }, [socket]);

  return (
    <div>
      {
        showGame
          ? <Game1 players={players} socket={socket} username={player.username} />
          : <Form addPlayers={addPlayers} socket={socket} setPlayer={setPlayer} />
      }
      {
        isOpponentDisconnect && <div style={{ color: 'red' }}>nobody is here...</div>
      }
    </div>
  );
}

export default App;
