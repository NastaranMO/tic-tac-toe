import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { v4 as uuid } from 'uuid'

dotenv.config()
const port = process.env.PORT
let players = []
const rooms = [];

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
    const player = {
      id: socket.id,
      name: data,
      matched: false
    }
    players.push(player)

    console.log(`User ${player.name} with id ${socket.id} joined to the game`)
  })
  // socket.on('send_message', (data) => {

  // })
  socket.on('find_match', (data) => {
    const freePlayer = players.find(player => !player.matched && player.id !== socket.id)

    if (freePlayer) {
      socket.emit('response_match', freePlayer)

      console.log(socket.id)
      const player = players.find(p => p.id === socket.id)
      player.matched = true
      freePlayer.matched = true

      console.log(`match the player  ${data} ${socket.id} with ${freePlayer?.name}`)
      console.log('array of players: ', players)
    } else {
      socket.emit('response_match', null)
      console.log('no match')
    }
  })

  socket.on('disconnect', () => {
    const updatedPlayers = players.filter(player => player.id !== socket.id)
    players = updatedPlayers
    console.log(`User ${socket.id} is disconnected`)
  })
})

server.listen(port, () => console.log(`Listen on port ${port}`))
