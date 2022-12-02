import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import Game1 from './components/Game1';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [players, setPlayers] = useState([]);

  const [showGame, setShowGame] = useState(false);

  const joinGameSubmitHandler = async () => {
    if (username !== '' && room !== '') {
      await socket.emit('join_game', { room, username });
      setShowGame(true);
      setPlayers((prev) => [...prev, username]);
    }
  };
  console.log(players)

  useEffect(() => {
    socket.on('new_player_joined', (data) => {
      console.log('data is coming', data);
      setPlayers(data);
    });
  }, [socket]);

  return (
    <div>
      {
        showGame
          ? <Game1 players={players} socket={socket} username={username} />
          : (
            <form onSubmit={joinGameSubmitHandler}>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
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
