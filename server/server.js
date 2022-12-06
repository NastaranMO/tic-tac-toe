import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { v4 } from 'uuid'
// import { v4 as uuid } from 'uuid'

dotenv.config()
const port = process.env.PORT

const app = express()

app.use(cors())
const server = http.createServer(app)

let clients = []

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// const createPlayer = (socket, data) => {
//   const { username } = data
//   const isFirst = players.length === 0

//   const newPlayer = {
//     id: socket.id,
//     username,
//     symbol: isFirst ? 'X' : 'O',
//     turn: isFirst,
//     room
//   }
//   return newPlayer
// }

const checkRooms = () => {
  const client = clients.find(p => p.players?.length < 2)
  if (client) {
    const { room: emptyRoom } = client
    return emptyRoom
  }
}

const createPlayer = (socket, data) => {
  const potentialRoom = checkRooms()
  let room
  if (potentialRoom) {
    room = potentialRoom
    const client = clients.find(c => c.room === potentialRoom)
    const isFirst = client.players.length === 0

    const newPlayer = {
      id: socket.id,
      username: data.username,
      symbol: isFirst ? 'X' : 'O',
      turn: isFirst,
      room
    }
    return [newPlayer, room]
  }

  room = v4()
  clients.push({ room, players: [] })

  const newPlayer = {
    id: socket.id,
    username: data.username,
    symbol: 'X',
    turn: true,
    room
  }
  return [newPlayer, room]
}

// const isGameBegin = () => players.length === 2

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('connect-game', (data) => {
    // console.log('connect to game :', data)
    const [newPlayer, room] = createPlayer(socket, data)
    const client = clients.find(c => c.room === room)
    client.players.push(newPlayer)
    socket.join(room)

    // console.log('clients connect game is', clients)
    clients.map(c => console.log('c', c))
    // console.log('client => connect game is', client)

    socket.to(room).emit('new_player_connected', client)
  })

  // socket.on('join_game', (data) => {
  //   socket.join(data.room)
  //   console.log(`User with ID: ${socket.id} ${data.username} joined room: ${data.room}`)

  //   const newPlayer = createPlayer(socket, data)
  //   clients.push(newPlayer)

  //   socket.emit('new_player_joined', clients)
  //   socket.to(data.room).emit('new_player_joined', clients)
  // })

  // socket.on('move', (data) => {
  //   console.log(data.room)
  //   socket.to(data.room).emit('move_sent', data)
  // })

  // socket.on('winner', (data) => {
  //   console.log(data.room)
  //   console.log(`winner============> ${data.winner}`)
  //   socket.to(data.room).emit('winner_sent', data.winner)
  // })

  socket.on('disconnect', () => {
    const disconnectClient = clients.find(c => c.players.find(p => p.id === socket.id))
    const room = disconnectClient?.room
    console.log('disconnetct room', room)
    if (room) {
      clients = clients.filter(c => c.room !== room)
      socket.to(room).emit('user_left', clients)
    }

    // if (room) {
    //   socket.to(room).emit('userLeft', clients)
    // }
    console.log('clients disconnected', clients)
    console.log('User Disconnected', socket.id)
  })
})

app.get('/game/:username', (req, res) => {
  const client = clients.find(c => c.players.find(p => p.username === req.params.username))
  console.log('api=====>', client)
  res.json(client)
})

server.listen(port, () => console.log(`Listen on port ${port}`))
