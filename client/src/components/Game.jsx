/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Game({ players }) {
  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const moveHandler = (x, y) => {
    // console.log(x, y, board[0][0]);
    const upadatedBoard = board;
    const boardRow = upadatedBoard[x];
    boardRow[y] = 'X';
    setBoard(upadatedBoard);
    // setBoard((prev) => {
    //   prev[x][y] = 2;
    // });
    console.log('board:', board);
  };
  return (
    <div className="board-game-container">
      <h1>Game</h1>
      <ul>{players.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
      <div className="row">
        <button className="column" type="submit" onClick={() => moveHandler(0, 0)}>x</button>
        <button className="column" type="submit" onClick={() => moveHandler(0, 1)}>x</button>
        <button className="column none-border-right" type="submit" onClick={() => moveHandler(0, 2)}>x</button>
      </div>
      <div className="row">
        <button className="column" type="submit" onClick={() => moveHandler(1, 0)}>x</button>
        <button className="column" type="submit" onClick={() => moveHandler(1, 1)}>x</button>
        <button className="column none-border-right" type="submit" onClick={() => moveHandler(1, 2)}>x</button>
      </div>
      <div className="row">
        <button className="column none-border-bottom" type="submit" onClick={() => moveHandler(2, 0)}>x</button>
        <button className="column none-border-bottom" type="submit" onClick={() => moveHandler(2, 1)}>x</button>
        <button className="column none-border-bottom none-border-right" type="submit" onClick={() => moveHandler(2, 2)}>x</button>
      </div>
    </div>
  );
}

export default Game;

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
