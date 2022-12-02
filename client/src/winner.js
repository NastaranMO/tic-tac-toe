// export default (board, setWinner) => {
//   for (let i = 0; i < 3; i++) {
//     if (board[i][0] === board[i][1] === board[i][2] === 'X' || board[i][0] === board[i][1] === board[i][2] === 'O') {
//       setWinner(board[i][0])
//       return true
//     }

//     if (board[0][i] === board[1][i] == board[2][i] === 'X' || board[0][i] === board[1][i] == board[2][i] === 'O') {
//       setWinner(board[0][i])
//       return true
//     }

//     if (board[0, 0] === board[1, 1] === board[2, 2] === "X" || board[0, 0] === board[1, 1] === board[2, 2] === "O") {
//       setWinner(board[0][i])
//       return true
//     }

//     if (board[2, 0] === board[1, 1] === board[0, 2] === 'X' || board[2, 0] === board[1, 1] === board[0, 2] === 'O') {
//       setWinner(board[0][i])
//       return true
//     }
//   }
// }

export default (board, setWinner) => {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] === board[i][2]) {

      setWinner(board[i][0])
      return true
    }

    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] === board[2][i]) {
      setWinner(board[0][i])
      return true
    }

    if (board[0][i] !== '' && board[0, 0] === board[1, 1] && board[1, 1] === board[2, 2] && board[2, 2] === board[0, 0]) {
      setWinner(board[0][i])
      return true
    }

    if (board[0][i] !== '' && board[2, 0] === board[1, 1] && board[1, 1] === board[0, 2] && board[2, 2] === board[0, 2]) {
      setWinner(board[0][i])
      return true
    }
  }
}