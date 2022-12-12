const getData = () => JSON.parse(localStorage.getItem('tic-tac-toe')) || '';
const store = (data) => localStorage.setItem('tic-tac-toe', JSON.stringify(data))

export {
  getData,
  store
}