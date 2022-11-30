import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3001/');

const storeData = (data) => window.localStorage.setItem('tic-tac-toe', JSON.stringify(data));
const getData = () => JSON.parse(window.localStorage.getItem('tic-tac-toe')) || {};

function App() {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const joinGame = (e) => {
    e.preventDefault();
    storeData({ username });
    setIsLogin(true);
    socket.emit('join_game', username);
  };

  const findMatch = () => {
    socket.emit('find_match', username);
  };

  useEffect(() => {
    const userData = getData();
    const isEmpty = Object.keys(userData).length === 0;
    if (!isEmpty) {
      setUsername(userData.username);
      setIsLogin(true);
      console.log('emit message');
      socket.emit('join_game', userData.username);
    }
  }, []);

  return (
    <div className="App">
      <h1>Online Tictactoe</h1>
      {isLogin
        ? (
          <>
            <h2>
              Hello
              {' '}
              {username}
            </h2>
            <button type="submit" onClick={findMatch}>Find a match</button>
          </>
        )
        : (
          <form onSubmit={joinGame}>
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
        )}
    </div>
  );
}

export default App;
