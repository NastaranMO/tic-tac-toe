import React, { useState, useEffect } from 'react';

function Game1({ players, socket, username }) {
  console.log('players from game:', players, username)
  const numbers = [1, 2, 3]
  const [board, setBoard] = useState([
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
  ]);
  const [winner, setWinner] = useState('')
  const [isFinish, setIsFinish] = useState(false)

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

    console.log('board:', board);
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] === board[i][2]) {
        setWinner(board[i][0])
        setIsFinish(true)
        return true
      }

      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] === board[2][i]) {
        setWinner(board[0][i])
        setIsFinish(true)
        return true
      }

      if (board[0, 0] === board[1, 1] && board[1, 1] === board[2, 2] && board[2, 2] === board[0, 0]) {
        setWinner(board[0][i])
        setIsFinish(true)
        return true
      }

      if (board[2, 0] === board[1, 1] && board[1, 1] === board[0, 2] && board[2, 2] === board[0, 2]) {
        setWinner(board[0][i])
        setIsFinish(true)
        return true
      }
    }
  }

  useEffect(() => {
    socket.on('move_sent', (data) => {

      console.log('data move:', data)
      board[data.x][data.y] = data.symbol;
      setBoard((prev) => [...prev]);
      checkWinner()
      console.log('move===>', data)

    })

    socket.on('winner_sent', (data) => {
      setIsFinish(true)
      console.log(data)
    })

    if (winner) {
      socket.emit('winner', { winner, room: '123' })
    }
  }, [socket, winner])


  return (
    <div>
      <div className="row">
        {isFinish && <div>Akhjooooooooon</div>}

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
