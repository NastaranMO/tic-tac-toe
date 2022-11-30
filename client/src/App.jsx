import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3001/');

function App() {
  const [msg, setMsg] = useState();
  const [room, setRoom] = useState('');

  const onChangeHAndler = (e) => {
    setMsg(e.target.value);
  };
  const generateRomm = (e) => {
    e.preventDefault();
    socket.emit('join_game', room);
  };

  useEffect(() => {
    setRoom(1);
  }, []);

  return (
    <div className="App">
      <form onSubmit={generateRomm}>
        <input
          type="text"
          placeholder="write your message here..."
          onChange={onChangeHAndler}
        />
        <span>{msg}</span>
        <button type="submit">New game</button>
      </form>
    </div>
  );
}

export default App;
