import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game1 from './components/Game1';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showGame, setShowGame] = useState(false);
  const [players, setPlayers] = useState([]);

  const joinRoom = async () => {
    if (username !== '' && room !== '') {
      await socket.emit('join_room', { room, username });
      setShowGame(true);
      setPlayers((prev) => [...prev, username]);
    }
  };
  console.log(players)

  useEffect(() => {
    socket.on('new_player_joined', (data) => {
      console.log('data is coming', data);
      console.log(data)
      const updatedData = data.map((d, i) => i === 0 ? ({ ...d, symbol: 'X' }) : ({ ...d, symbol: 'O' }))
      setPlayers(updatedData);
    });
  }, [socket]);

  return (
    <div>
      {
        showGame
          ? <Game1 players={players} socket={socket} username={username} />
          : (
            <form onSubmit={joinRoom}>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="John..."
              />
              <input
                type="text"
                onChange={(e) => setRoom(e.target.value)}
                placeholder="123..."
              />
              <button type="submit">Enter</button>
            </form>
          )
      }
    </div>
  );
}

export default App;
