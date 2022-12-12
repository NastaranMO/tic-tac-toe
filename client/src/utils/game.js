const checkIsGameBegin = (players) => players.length === 2
export default (players) => players && checkIsGameBegin(players)
