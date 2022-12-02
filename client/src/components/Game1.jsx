import React, { useState, useEffect } from 'react';
import { Profile } from './Profile';
import checkWinner from '../winner'

function Game1({ players, setPlayers, player, socket, username }) {
  // console.log('players from game:', players)
  const numbers = [1, 2, 3]
  const [board, setBoard] = useState([
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
  ]);
  const [winner, setWinner] = useState('')
  const [isOpponentDisconnect, setIsOpponentDisconnect] = useState(false);


  const moveHandler = async (x, y) => {
    const player = players.find(p => p.username === username)
    board[x][y] = player.symbol;
    setBoard((prev) => [...prev]);
    const moveData = {
      ...player,
      turn: true,
      symbol: player.symbol,
      x,
      y,
      room: player.room,
    };
    socket.emit('move', moveData);
    if (checkWinner(board, setWinner)) {
      setWinner(player.symbol)
    }

    console.log('board:', board);
  };

  useEffect(() => {
    socket.on('userLeft', (data) => {
      setPlayers(data);
      console.log('Your opponent left the game')
      setIsOpponentDisconnect(true)
    });

    socket.on('move_sent', (data) => {

      console.log('data move:', data)
      board[data.x][data.y] = data.symbol;
      setBoard((prev) => [...prev]);
      checkWinner(board, setWinner)
      console.log('move===>', data)

    })

    socket.on('winner_sent', (data) => {
      console.log(data)
    })


    if (winner) {
      socket.emit('winner', { winner, room: '123' })
    }
  }, [socket, winner])


  return (
    <div>
      {
        isOpponentDisconnect && <div style={{ color: 'red' }}>nobody is here...</div>
      }
      {players?.map(p => <Profile key={p.id} player={p} isCurrentPlayer={p.username === player.username} />)}
      <div className="row">
        {winner && <div>Akhjooooooooon</div>}

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
            onClick={() => moveHandler(2, i)}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game1;
