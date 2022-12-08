import React, { useState, useEffect } from 'react';
import './index.css'
import { isWinner, isDraw } from '../../winner'
import Status from '../Status';
import Modal from '../Modal';
import Cell from '../Cell';

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

    if (isDraw(board) && !isWinner(board, player.symbol)) {
      setWinner('draw')
      socket.emit('winner', { ...player, winner: 'draw' })
      store({ username: player.username, win: player.win, lost: player.lost, draw: player.draw + 1, total: player.total + 1 })
      return;
    }

    if (isWinner(board, player.symbol)) {
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
      if (data === 'draw') {
        store({ username: player.username, win: player.win, lost: player.lost, draw: player.draw + 1, total: player.total + 1 })
        return;
      }
      store({ username: player.username, win: player.win, lost: player.lost + 1, draw: player.draw, total: player.total + 1 })
    })

    socket.on('move_sent', (data) => {
      console.log('move sent event called', data)
      setBoard(data.board)
      setIsTurn(!data.turn)
      const updatedPlayers = players.map(p => p.username === username ? ({ ...p, turn: !data.turn }) : ({ ...p, turn: data.turn }))
      setPlayers(updatedPlayers)
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
              <Cell
                key={keyCells[idx]}
                cell={cell}
                id={idx}
                moveHandler={moveHandler}
                isTurn={isTurn}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
