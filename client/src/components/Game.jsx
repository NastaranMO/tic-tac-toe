/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Game({ players, username }) {
  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = useState([
    ['0,0', '0,1', '0,2'],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [player, setPlayer] = useState('');

  const moveHandler = (x, y) => {
    // console.log(x, y, board[0][0]);
    const upadatedBoard = board;
    const boardRow = upadatedBoard[x];
    boardRow[y] = players.symbol;
    setBoard(upadatedBoard);
    // setBoard((prev) => {
    //   prev[x][y] = 2;
    // });
    console.log('board:', board);
  };
  const numbers = [1, 2, 3];

  useEffect(() => {
    const currentPlayer = players.find((p) => p.name === username);
    if (currentPlayer) setPlayer(currentPlayer);
  });
  return (
    <div className="board-game-container">
      <h1>
        Game starts player
        {' '}
        {player.name}
      </h1>
      {/* <ul>
        {players.map((p) => (
          <li key={p.id}>
            {p.name}
            {' '}
            {p.symbol}
          </li>
        ))}
      </ul> */}
      <div className="row">

        {board[0].map((b, i) => (
          <button
            key={numbers[i]}
            type="submit"
            className={i === 2 ? 'column none-border-right' : 'column'}
            onClick={() => moveHandler(0, i)}
          >
            {b}
            {i}
          </button>
        ))}

        {/* <button className="column" type="submit" onClick={() => moveHandler(0, 0)}>E</button>
        <button className="column" type="submit" onClick={() => moveHandler(0, 1)}>E</button>
        <button className="column none-border-right" type="submit"
         onClick={() => moveHandler(0, 2)}>E</button> */}
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
            {i}
          </button>
        ))}
        {/* <button className="column" type="submit" onClick={() => moveHandler(1, 0)}>E</button>
        <button className="column" type="submit" onClick={() => moveHandler(1, 1)}>E</button>
        <button className="column none-border-right"
         type="submit" onClick={() => moveHandler(1, 2)}>E</button> */}
      </div>
      <div className="row">
        <button className="column none-border-bottom" type="submit" onClick={() => moveHandler(2, 0)}>E</button>
        <button className="column none-border-bottom" type="submit" onClick={() => moveHandler(2, 1)}>E</button>
        <button className="column none-border-bottom none-border-right" type="submit" onClick={() => moveHandler(2, 2)}>E</button>
      </div>
    </div>
  );
}

export default Game;

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape).isRequired,
  username: PropTypes.string.isRequired,
};
