import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

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
    socket.join(data)
    console.log(`User with id ${socket.id} joined to the game with id ${data}`)

    // socket.on('send_message', (data) => {

    // })
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} is disconnected`)
  })
})

server.listen(port, () => console.log(`Listen on port ${port}`))
