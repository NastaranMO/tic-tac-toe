import React, { useState, useEffect } from 'react';
import './index.css'
import checkWinner from '../../winner'
import Status from '../Status';
import Modal from '../Modal';
import { ReactComponent as X } from '../../assests/icon-x.svg'
import { ReactComponent as O } from '../../assests/icon-o.svg'

const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))

function Game({ players, setPlayers, player, socket, username, setIsGameBegin }) {
  console.log('players from game===>', players)

  const keyCells = Array(9).fill(0).map((num, i) => num + i)
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('')
  const [isTurn, setIsTurn] = useState(player.turn)


  const moveHandler = async (idx) => {
    board[idx] = player.symbol;
    setBoard(prev => [...prev]);
    socket.emit('move', { ...player, board });

    const updatedPlayers = players.map(p => ({ ...p, turn: !p.turn }))
    setPlayers(updatedPlayers)

    if (checkWinner(board, player.symbol)) {
      console.log('winner:', player.symbol)

      setWinner(player.symbol)
      store({ username: player.username, win: player.win + 1, lost: player.lost, draw: player.draw, total: player.total + 1 })
      setIsTurn(false)
      socket.emit('winner', { ...player, winner: player.symbol })
    }

    setIsTurn(prev => !prev)
    console.log('board:', board);
  };

  useEffect(() => {
    socket.on('winner_sent', (data) => {
      console.log('winner in winner sent', data)
      setWinner(data)
    })

    socket.on('move_sent', (data) => {
      console.log('move sent event called', data)

      setBoard(data.board)
      setIsTurn(!data.turn)
      // checkWinner(board, setWinner)
      store({ username: player.username, win: player.win, lost: player.lost + 1, draw: player.draw, total: player.total + 1 })
      const updatedPlayers = players.map(p => p.username === username ? ({ ...p, turn: !data.turn }) : ({ ...p, turn: data.turn }))
      setPlayers(updatedPlayers)
      console.log('move===>', data)
    })


    if (winner) {
      setIsTurn(false)
    }
  }, [socket, winner])

  return (
    <>
      <div>
        <Modal showModal={winner ? true : false} winner={winner} setIsGameBegin={setIsGameBegin} />
        <Status players={players} isTurn={isTurn} />
        <div className={isTurn ? 'game-container board-game--turn' : 'game-container board-game'}>
          <div className={player.symbol === 'X' ? 'board-game__container x' : 'board-game__container o'}>
            {board.map((cell, idx) =>
              <button
                className={cell !== '' ? 'cell cell-disable' : 'cell'}
                key={keyCells[idx]}
                onClick={() => moveHandler(idx)}
              >
                {cell === 'X' && <X />}
                {cell === 'O' && <O />}
              </button>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
