/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Game({
  // eslint-disable-next-line no-unused-vars
  socket, room, players, username,
}) {
  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = useState([
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
  ]);
  console.log('players', players);
  const player = players.find((p) => p.name === username);

  const moveHandler = async (x, y) => {
    board[x][y] = player.symbol;
    setBoard((prev) => [...prev]);
    const moveData = {
      player,
      turn: true,
      symbol: player.symbol,
      x,
      y,
      room,
    };
    await socket.emit('move', moveData);

    console.log('board:', board);
  };
  const numbers = [1, 2, 3];

  useEffect(() => {
    // debugger;
    // if (currentPlayer) {
    //   console.log('currentplayer:', currentPlayer, username);
    // }

    socket.on('move-recieved', (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="board-game-container">
      <h1>
        Game starts player
        {' '}
        {player?.name}
      </h1>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            {p.name}
            {' '}
            {p.symbol}
          </li>
        ))}
      </ul>
      <div className="row">

        {board[0].map((b, i) => (
          <button
            key={numbers[i]}
            type="submit"
            className={i === 2 ? 'column none-border-right' : 'column'}
            onClick={() => moveHandler(0, i)}
          >
            {b}
          </button>
        ))}
      </div>
      <div className="row">
        {board[1].map((b, i) => (
          <button
            key={numbers[i]}
            type="submit"
            className={i === 2 ? 'column none-border-right' : 'column'}
            onClick={() => moveHandler(1, i)}
          >
            {b}
          </button>
        ))}
      </div>
      <div className="row">
        {board[2].map((b, i) => (
          <button
            key={numbers[i]}
            type="submit"
            className={i === 2 ? 'column none-border-bottom none-border-right' : 'column none-border-bottom'}
            onClick={() => moveHandler(1, i)}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;

Game.propTypes = {
  // player: PropTypes.objectOf(PropTypes.shape).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape).isRequired,
  username: PropTypes.string.isRequired,
  socket: PropTypes.objectOf(PropTypes.shape).isRequired,
  room: PropTypes.string.isRequired,
};
