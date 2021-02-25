import Message from '../../models/message.js'
import UserController from '../../controllers/userController.js'
import {config} from '../../../config/config.js'


export default class MessageEvent {
    constructor() {
    }

    static userMessage(msg, socketServer, socket_id) {
        const user = this.getUser(socket_id)

        socketServer.emit('message',
            new Message(user.username, msg))
    }

    static botWelcomeMessage(socket) {
        socket.emit('message',
            new Message(config.app.botName, config.app.welcomeMessage))
    }

    static broadCastToChatRoomJoinedMessage(socket, user) {
        socket.broadcast.to(user.chatroom).emit('message',
            new Message(config.app.botName, this.phraseGenerator(config.app.someoneJoinedChatMessage, user.username)))
    }

    static broadCastToChatRoomLeft(socketServer, user) {
        socketServer.to(user.chatroom).emit('message',
            new Message(config.app.botName, this.phraseGenerator(config.app.someoneLeftChatMessage, user.username)))
    }

    static getUser(socket_id) {
        return UserController.getUser(socket_id)
    }

    static phraseGenerator(phrase, username) {
        return phrase.replace(/\bUSER\b/g, username)
    }
}
