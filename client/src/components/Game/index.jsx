import React, { useState, useEffect } from 'react';
import './index.css'
import { isWinner, isDraw } from '../../utils/winner'
import Status from '../Status';
import Modal from '../Modal';
import Cell from '../Cell';
import { store, getData } from '../../utils/store'

function Game({ players, setPlayers, player, socket, username, setIsGameBegin, setPlayer }) {
  const keyCells = Array(9).fill(0).map((num, i) => num + i)
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('')
  const [isTurn, setIsTurn] = useState(player.turn)
  const [showTimer, setShowTimer] = useState(0);

  const newData = getData()

  const moveHandler = async (idx) => {
    board[idx] = player.symbol;
    setBoard(prev => [...prev]);
    socket.emit('move', { ...player, board });

    const updatedPlayers = players.map(p => ({ ...p, turn: !p.turn }))
    setPlayers(updatedPlayers)

    const [checkWinner, winnerPattern] = isWinner(board, player.symbol);

    if (isDraw(board) && !checkWinner) {
      setWinner('draw')
      socket.emit('winner', { ...player, winner: 'draw' })
      const newPlayer = { username: newData.username, win: newData.win, lost: newData.lost, draw: newData.draw + 1, total: newData.total + 1 }
      store(newPlayer)
      setPlayer(prev => ({ ...prev, ...newPlayer }))
      return;
    }

    if (checkWinner) {
      const newPlayer = { username: newData.username, win: newData.win + 1, lost: newData.lost, draw: newData.draw, total: newData.total + 1 };
      store(newPlayer)
      setPlayer(prev => ({ ...prev, ...newPlayer }))
      setIsTurn(false)
      socket.emit('winner', { ...player, winner: player.symbol })
      setWinner(player.symbol)
    }

    setIsTurn(prev => !prev)
  };

  useEffect(() => {
    socket.on('winner_sent', (data) => {
      setWinner(data)
      if (data === 'draw') {
        const newPlayer = { username: newData.username, win: newData.win, lost: newData.lost, draw: newData.draw + 1, total: newData.total + 1 }
        store(newPlayer)
        setPlayer(prev => ({ ...prev, ...newPlayer }))
        return;
      }
      const newPlayer = { username: newData.username, win: newData.win, lost: newData.lost + 1, draw: newData.draw, total: newData.total + 1 }
      store(newPlayer)
      setPlayer(prev => ({ ...prev, ...newPlayer }))
    })

    socket.on('move_sent', (data) => {
      setBoard(data.board)
      setIsTurn(!data.turn)
      const updatedPlayers = players.map(p => p.username === username ? ({ ...p, turn: !data.turn }) : ({ ...p, turn: data.turn }))
      setPlayers(updatedPlayers)
    })


    if (winner) {
      setIsTurn(false)
    }

    if (showTimer <= 5) {
      setTimeout(() => {
        setShowTimer(prev => prev + 1)
      }, 1000);
    }
  }, [socket, winner, showTimer])

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
