import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
// import { v4 as uuid } from 'uuid'

dotenv.config()
const port = process.env.PORT

const app = express()
const server = http.createServer(app)

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
    const numOfClients = io.sockets.adapter.rooms.get(data).size

    if (numOfClients < 2) {
      socket.join(data)
      console.log(`User with id ${socket.id} joined to the room ${data}`)
    }
  })

  // socket.on('set')

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} is disconnected`)
  })
})

server.listen(port, () => console.log(`Listen on port ${port}`))
