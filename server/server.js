import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { v4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const port = process.env.PORT || 3000

const app = express()

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client', 'build')
  app.use(express.static(buildPath))
}

app.use(cors())
const server = http.createServer(app)

let clients = []

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

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
      ...data,
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
    ...data,
    id: socket.id,
    username: data.username,
    symbol: 'X',
    turn: true,
    room
  }
  return [newPlayer, room]
}

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('connect-game', (data) => {
    console.log('data===========>', data)

    const [newPlayer, room] = createPlayer(socket, data)
    const client = clients.find(c => c.room === room)
    client.players.push(newPlayer)
    socket.join(room)

    clients.map(c => console.log('c', c))
  })

  socket.on('start_game', (data) => {
    const client = clients.find(c => c.players.find(p => p.username === data))
    io.in(client.room).emit('start', client)
  })
  socket.on('move', (data) => {
    const { players: updatedClients } = clients.find(c => c.room === data.room)
    const x = updatedClients.map(p => p.id === socket.id ? ({ ...p, ...data, turn: !p.turn }) : ({ ...p, ...data, turn: !p.turn }))
    socket.to(data.room).emit('move_sent', ...x)
  })

  socket.on('winner', (data) => {
    console.log(data.room)
    console.log(`winner============> ${data.winner}`)
    clients.map(c => console.log('w', c))
    clients = clients.filter(c => c.room !== data.room)

    socket.to(data.room).emit('winner_sent', data.winner)
  })

  socket.on('remove_user', (data) => {
    clients = clients.filter(c => c.room === data)
  })

  socket.on('disconnect', () => {
    const disconnectClient = clients.find(c => c.players.find(p => p.id === socket.id))
    const room = disconnectClient?.room

    if (room) {
      clients = clients.filter(c => c.room !== room)
      socket.to(room).emit('user_left', clients)
    }

    console.log('clients disconnected', clients)
    console.log('User Disconnected', socket.id)
  })
})

app.get('/game/:username', (req, res) => {
  const client = clients.find(c => c.players.find(p => p.username === req.params.username))
  res.json(client)
})

app.get('/user/:username', (req, res) => {
  const client = clients.find(c => c.players.find(p => p.username === req.params.username))
  res.json(client)
})

app.delete('/user/:username', (req, res) => {
  const { username } = req.params
  const currentClient = clients.find(c => c.players.find(p => p.username === username))
  if (currentClient.players.length === 1) {
    clients = clients.filter(c => c.room !== currentClient.room)
    res.json()
    return
  }

  clients = clients.map(c => c.room === currentClient.room ? ({ ...c, players: currentClient.players.find(p => p.username !== username) }) : c)
  res.json()
})

server.listen(port, () => console.log(`Listen on port ${port}`))
