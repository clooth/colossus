'use strict'

import Primus from 'primus'
import PrimusRooms from 'primus-rooms'
import http from 'http'

const configurePrimus = (http) => {
  const primus = new Primus(http, { parser: 'binary' })
  primus.use('rooms', PrimusRooms)
  return primus
}

class Colossus {
  constructor() {
    // Initialize HTTP server
    this.httpServer = http.createServer()

    // Initialize msgpack primus backend
    this.primus = configurePrimus(this.httpServer)

    // New connection arrived
    this.primus.on('connection', (spark) => {
      spark.on('data', (data) => {
        data = data || {}

        const action = data.action
        const room   = data.room

        // Join a room
        if (action === 'join') {
          spark.join(room, () => {
            spark.write(`Entered instance: ${room}`)
            spark.room(room).except(spark.id).write(`${spark.id} entered instance.`)
          })
        }

        // Leave a room
        if (action === 'leave') {
          spark.leave(room, () => {
            spark.write(`Left instance: ${room}`)
            spark.room(room).except(spark.id).write(`Left instance: ${room}`)
          })
        }
      })
    })
  }

  start() {
    this.httpServer.listen(8080, () => {
      console.log(`[COLOSSUS] Server started.`)
    })
  }
}

const server = new Colossus()
server.start()
