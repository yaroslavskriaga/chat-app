import MessageEvent from '../events/message.js'


export default class UserChatMessage {
    constructor(socket, socketServer) {
        socket.on('ChatMessage', (msg) => {
            return MessageEvent.userMessage(msg, socketServer, socket.id)
        })
    }
}
