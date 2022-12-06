import React, { useState, useEffect } from 'react';
import './index.css'
import checkWinner from '../../winner'
import Status from '../Status';

const checkIsGameBegin = (players) => players.length === 2

function Game({ players, setPlayers, player, socket, username }) {
  console.log('players from game===>', players)
  const numbers = [1, 2, 3]
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [winner, setWinner] = useState('')
  const [isOpponentDisconnect, setIsOpponentDisconnect] = useState(false);
  const [isTurn, setIsTurn] = useState(player.turn)


  const moveHandler = async (x, y) => {
    const player = players.find(p => p.username === username)
    board[x][y] = player.symbol;
    setBoard((prev) => [...prev]);
    const moveData = {
      ...player,
      turn: false,
      symbol: player.symbol,
      x,
      y,
      room: player.room,
    };
    socket.emit('move', moveData);
    if (checkWinner(board, setWinner)) {
      setWinner(player.symbol)
      setIsTurn(false)
    }

    setIsTurn(prev => !prev)

    console.log('board:', board);
  };

  useEffect(() => {
    // socket.on('userLeft', (data) => {
    //   // setPlayers(data);
    //   console.log('Your opponent left the game')
    //   setIsOpponentDisconnect(true)
    // });

    socket.on('move_sent', (data) => {

      console.log('data move:', data)
      board[data.x][data.y] = data.symbol;
      setBoard((prev) => [...prev]);
      setIsTurn(!data.turn)
      checkWinner(board, setWinner)
      console.log('move===>', data)

    })

    socket.on('winner_sent', (data) => {
      console.log(data)
    })


    if (winner) {
      setIsTurn(false)
      socket.emit('winner', { winner, room: '123' })
    }
  }, [socket, winner])


  return (
    <div>
      {
        isOpponentDisconnect && <div style={{ color: 'red' }}>nobody is here...</div>
      }
      <Status players={players} />
      {/* {players?.map(p => <Profile key={p.id} player={p} isCurrentPlayer={p.username === player.username} />)} */}
      <div className='board-game-container'>
        <div className="row">
          {winner && <div>Akhjooooooooon</div>}

          {board[0].map((b, i) => (
            <button
              key={numbers[i]}
              type="submit"
              className={i === 2 ? 'column none-border-right' : 'column'}
              onClick={() => moveHandler(0, i)}
              disabled={!isTurn}
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
              disabled={!isTurn}
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
              disabled={!isTurn}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
