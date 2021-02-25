import JoinRoom from './joinRoom.js'
import UserChatMessage from './userChatMessage.js'
import Disconnection from './disconnection.js'

export default class Connection {
    constructor(socketServer) {
        socketServer.on('connection', socket => {
            return [
                new JoinRoom(socket, socketServer),
                new Disconnection(socket, socketServer),
                new UserChatMessage(socket, socketServer)
            ]
        })
    }
}
