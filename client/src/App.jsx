import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Game from './components/Game';

const socket = io.connect('http://localhost:3001/');

const storeData = (data) => window.localStorage.setItem('tic-tac-toe', JSON.stringify(data));
const getData = () => JSON.parse(window.localStorage.getItem('tic-tac-toe')) || {};

function App() {
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isNewGame, setIsNewGame] = useState(false);

  const joinGame = (e) => {
    e.preventDefault();
    storeData({ username });
    setIsLogin(true);
    socket.emit('join_game', username);
  };

  const newGameSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit('new_game', { room, username });
    setIsNewGame(true);
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

    socket.on('begin_game', (payload) => {
      console.log('players==>', payload);
      setPlayers(payload);
    });
  }, [socket]);

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
              {' '}
              {room}
            </h2>
            {!isNewGame && (
              <form onSubmit={newGameSubmitHandler}>
                <input type="text" placeholder="game id..." onChange={(e) => setRoom(e.target.value)} />
                <button type="submit">New game</button>
              </form>
            )}
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

      {isNewGame
        && <Game players={players} username={username} />}
    </div>
  );
}

export default App;
