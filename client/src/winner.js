const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const isWinner = (board, symbol) => {
  return combinations.some(arr => arr.every(i => board[i] === symbol))
}

const isDraw = (board) => {
  return board.every(item => item === 'X' || item === 'O')
}

export { isWinner, isDraw };