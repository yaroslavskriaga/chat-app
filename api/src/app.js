/**
 *
 * Author: Yaroslav Skriaga
 * Date: 01.12.2020
 * Do not change file ordering to prevent unpredictable behaviour
 *
 *
 * Entry file
 *
 **/

import express from 'express'
import path from 'path'
import {createServer} from 'http'
import {fileURLToPath} from 'url'
import {Server} from 'socket.io'
import SocketServer from './listeners/index.js'


/**
 * Manual configuration file
 **/

import {config} from '../config/config.js'

class Main {

    /**
     * Configurable front-end directory path
     **/
    static __filename = fileURLToPath(import.meta.url)
    static __dirname = path.dirname(this.__filename)

    /**
     * Server startup
     **/
    static app = express()
    static server = createServer(this.app)
    static socketServer = new Server(this.server)

    constructor() {
    }

    static init() {
        this.setUpDirectoryPath()
        this.runSocketServer()
        this.runServer()
    }

    static setUpDirectoryPath() {
        this.app.use(express.static(path.join(this.__dirname, '../../public')))
    }

    static runSocketServer() {
        return new SocketServer(this.socketServer)
    }

    static runServer() {
        this.server.listen(config.app.port, () => {
            console.log(`Server running on port ${config.app.port}`)
        })
    }

}

Main.init()

