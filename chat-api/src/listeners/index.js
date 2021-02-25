import Connection from './actions/connection.js'

export default class SocketServer {
    constructor(socketServer) {
        return new Connection(socketServer)
    }
}
