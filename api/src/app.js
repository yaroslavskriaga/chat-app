/**
 *
 * Author: Yaroslav Skriaga
 * Date: 01.12.2020
 *
 *
 * Entry file
 *
 **/

import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import SocketServer from './listeners/index.js'


/**
 * Manual configuration file
 **/

import {config} from '../config/config.js'

class Main {
    /**
     * Server startup
     **/
    static app = express()
    static server = createServer(this.app)
    static socketServer = new Server(this.server, this.setUpCors())

    constructor() {
    }

    static init() {
        this.runSocketServer()
        this.runServer()
    }

    static runSocketServer() {
        return new SocketServer(this.socketServer)
    }

    static setUpCors() {
        return {
            cors: {
                origin: config.cors.origin,
                credentials: config.cors.credentials
            }
        }
    }

    static runServer() {
        try {
            this.server.listen(config.app.port)
            console.log(`Server running on port ${config.app.port}`)
        } catch (e) {
            console.error(`[ERROR], ${e}`)
        }
    }

}

Main.init()

