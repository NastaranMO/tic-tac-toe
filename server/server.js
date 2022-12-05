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

let players = []

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const createPlayer = (socket, data) => {
  const { username, room } = data
  const isFirst = players.length === 0

  const newPlayer = {
    id: socket.id,
    username,
    symbol: isFirst ? 'X' : 'O',
    turn: isFirst,
    room
  }
  return newPlayer
}

// const isGameBegin = () => players.length === 2

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('connect-game', (data) => {
    console.log('connect to game :', data)
    const newPlayer = createPlayer(socket, data)
    players.push({ room: v4(), players: [{ ...newPlayer, ...data }] })
    console.log('players connect game is', players)
  })

  socket.on('join_game', (data) => {
    socket.join(data.room)
    console.log(`User with ID: ${socket.id} ${data.username} joined room: ${data.room}`)

    const newPlayer = createPlayer(socket, data)
    players.push(newPlayer)

    socket.emit('new_player_joined', players)
    socket.to(data.room).emit('new_player_joined', players)
  })

  socket.on('move', (data) => {
    console.log(data.room)
    socket.to(data.room).emit('move_sent', data)
  })

  socket.on('winner', (data) => {
    console.log(data.room)
    console.log(`winner============> ${data.winner}`)
    socket.to(data.room).emit('winner_sent', data.winner)
  })

  socket.on('disconnect', () => {
    const disconnectPlayer = players.find(p => p.id === socket.id)
    const room = disconnectPlayer?.room

    players = players.filter(p => {
      return p.id !== socket.id
    })

    if (room) {
      socket.to(room).emit('userLeft', players)
    }

    console.log('User Disconnected', socket.id)
  })
})

app.get('/game', (req, res) => {
  res.json(players)
})
server.listen(port, () => console.log(`Listen on port ${port}`))
