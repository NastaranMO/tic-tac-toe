import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
// import { v4 as uuid } from 'uuid'

dotenv.config()
const port = process.env.PORT

const app = express()
const server = http.createServer(app)

let players = []

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data.room)
    console.log(`User with ID: ${socket.id} ${data.username} joined room: ${data.room}`)
    players.push({
      id: socket.id,
      username: data.username,
      room: data.room,
      symbol: ''
    })

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
    players = players.filter(p => p.id !== socket.id)
    console.log('User Disconnected', socket.id)
  })
})

server.listen(port, () => console.log(`Listen on port ${port}`))
