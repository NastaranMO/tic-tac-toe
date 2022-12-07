

export default (board, setWinner) => {

  for (let i = 0; i < 3; i++) {
    console.log('here=====>', board[0][2], board[1][1], board[2][0])
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] === board[i][2]) {
      console.log('0')

      setWinner(board[i][0])
      return true
    }

    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] === board[2][i]) {
      console.log('1')

      setWinner(board[0][i])
      return true
    }

    if (board[0][i] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[0][0]) {
      console.log('2')
      setWinner(board[0][i])
      return true
    }

    if (board[0][2] !== '' && board[2][0] !== '' && board[1][1] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === board[0][2]) {
      console.log('here')
      setWinner(board[0][i])
      return true
    }
  }
}