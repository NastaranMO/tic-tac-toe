import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3001/');

const storeData = (data) => window.localStorage.setItem('tic-tac-toe', JSON.stringify(data));
const getData = () => JSON.parse(window.localStorage.getItem('tic-tac-toe')) || '';

function App() {
  const [username, setUsername] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [room, setRoom] = useState('');

  const generateRoom = (e) => {
    e.preventDefault();
    storeData(username);
    socket.emit('join_game', room);
  };

  useEffect(() => {
    const userData = getData();
    if (userData) setUsername(userData);
    setRoom(1);
  }, []);

  return (
    <div className="App">
      <h1>Online Tictactoe</h1>
      <h2>
        Hello
        {' '}
        {username}
      </h2>
      <form onSubmit={generateRoom}>
        <label htmlFor="username">
          Enter your name:
          <input
            type="text"
            id="username"
            placeholder="John..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default App;
