import UserController from '../../controllers/userController.js'
import MessageEvent from '../events/message.js'
import RoomCheckEvent from '../events/roomCheck.js'


export default class JoinRoom {
    constructor(socket, socketServer) {
        socket.on('joinRoom', ({username, chatroom}) => {

            const user = this.addUser(socket.id, username, chatroom)

            socket.join(user.chatroom)

            return [
                MessageEvent.broadCastToChatRoomJoinedMessage(socket, user),
                MessageEvent.botWelcomeMessage(socket),
                RoomCheckEvent.checkRoomsForUsersInside(socketServer, user)
            ]

        })
    }

    addUser(socket_id, username, chatroom) {
        return UserController.addUser(socket_id, username, chatroom)
    }

}
