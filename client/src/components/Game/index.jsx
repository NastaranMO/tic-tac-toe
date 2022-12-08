import React, { useState, useEffect } from 'react';
import './index.css'
import checkWinner from '../../winner'
import Status from '../Status';
import Modal from '../Modal';
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'
import { ReactComponent as XOutline } from '../../assests/icon-x-outline.svg'
import { ReactComponent as OOutline } from '../../assests/icon-o-outline.svg'

const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))

function Game({ players, setPlayers, player, socket, username, setIsGameBegin }) {
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
      x,
      y,
    };
    socket.emit('move', moveData);

    const updatedPlayers = players.map(p => p.username === username ? ({ ...p, turn: !p.turn }) : ({ ...p, turn: !p.turn }))
    setPlayers(updatedPlayers)

    if (checkWinner(board, setWinner)) {
      setWinner(player.symbol)
      store({ username: player.username, win: player.win + 1, lost: player.lost, draw: player.draw, total: total + 1 })
      console.log('winner:', player.symbol)
      setIsTurn(false)
    }

    setIsTurn(prev => !prev)

    console.log('board:', board);
  };

  useEffect(() => {

    socket.on('move_sent', (data) => {

      console.log('data move:', data)
      board[data.x][data.y] = data.symbol;
      setBoard((prev) => [...prev]);
      setIsTurn(!data.turn)
      checkWinner(board, setWinner)
      store({ username: player.username, win: player.win, lost: player.lost + 1, draw: player.draw, total: total + 1 })
      const updatedPlayers = players.map(p => p.username === username ? ({ ...p, turn: !data.turn }) : ({ ...p, turn: data.turn }))
      setPlayers(updatedPlayers)
      console.log('move===>', data)
    })

    socket.on('winner_sent', (data) => {
      console.log('winner in winner sent', data)
      console.log('winnerin useeffect:', winner)

    })


    if (winner) {
      setIsTurn(false)
      socket.emit('winner', { winner, room: '123' })
    }
  }, [socket, winner])

  return (
    <div>
      <Modal showModal={winner ? true : false} winner={winner} setIsGameBegin={setIsGameBegin} />
      <Status players={players} isTurn={isTurn} />
      <div className={isTurn ? 'board-game--turn' : 'board-game'}>
        <div className={player.symbol === 'X' ? 'board-game-container x' : 'board-game-container o'}>
          <div className="row">
            {winner && <div>Akhjooooooooon</div>}

            {board[0].map((b, i) => (
              <button
                key={numbers[i]}
                type="submit"
                className={b !== '' ? 'column column-disable' : 'column'}
                onClick={() => moveHandler(0, i)}
                disabled={(b !== '' || !isTurn) && true}
              >
                {b === 'X' && <X />}
                {b === 'O' && <O />}
              </button>
            ))}
          </div>
          <div className="row">
            {board[1].map((b, i) => (
              <button
                key={numbers[i]}
                type="submit"
                className={b !== '' ? 'column column-disable' : 'column'}

                onClick={() => moveHandler(1, i)}
                disabled={(b !== '' || !isTurn) && true}
              >
                {b === 'X' && <X />}
                {b === 'O' && <O />}
              </button>
            ))}
          </div>
          <div className="row">
            {board[2].map((b, i) => (
              <button
                key={numbers[i]}
                type="submit"
                className={b !== '' ? 'column column-disable' : 'column'}
                onClick={() => moveHandler(2, i)}
                disabled={(b !== '' || !isTurn) && true}
              >
                {b === 'X' && <X />}
                {b === 'O' && <O />}
              </button>
            ))}
          </div>
        </div>
        {
          isOpponentDisconnect && <div style={{ color: 'red' }}>nobody is here...</div>
        }
      </div>
    </div>
  );
}

export default Game;
