export const hasWinner = (board) => {
  const probs = [
    board[0] + board[1] + board[2],
    board[3] + board[4] + board[5],
    board[6] + board[7] + board[8],
    board[0] + board[3] + board[6],
    board[1] + board[4] + board[7],
    board[2] + board[5] + board[8],
    board[0] + board[4] + board[8],
    board[2] + board[4] + board[6],
  ]

  for(let i = 0; i < probs.length; i++){
  	if((probs[i] === 'XXX') || (probs[i] === 'OOO')) return probs[i][0]
  }

  return ""
}
