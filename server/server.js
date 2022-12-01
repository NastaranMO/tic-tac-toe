import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
// import { v4 as uuid } from 'uuid'

dotenv.config()
const port = process.env.PORT

const app = express()
const server = http.createServer(app)

const players = []

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on('join_game', (data) => {
    console.log(`User with id ${socket.id} ${data} joined to the game`)
  })

  socket.on('new_game', (data) => {
    console.log(`event new_game is clicked with id ${data.room}`)
    console.log(`rooms ${io.sockets.adapter.rooms}`)
    socket.join(data.room)
    console.log(`User with id ${socket.id} joined to the room ${data.room}`)

    const capacity = players.length
    if (capacity === 0) {
      players.push({
        id: socket.id,
        name: data.username,
        symbol: 'X'
      })

      return
    }

    if (capacity === 1) {
      players.push({
        id: socket.id,
        name: data.username,
        symbol: 'O'
      })
    }

    console.log(players.length)
    if (players.length === 2) {
      console.log('game is begining')
      socket.emit('begin_game', players)
    }
    // const numOfClients = io.sockets.adapter.rooms.get(data).size
  })

  // socket.on('begin_game', (data))

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} is disconnected`)
  })
})

server.listen(port, () => console.log(`Listen on port ${port}`))
