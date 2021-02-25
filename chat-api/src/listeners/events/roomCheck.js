import UserController from '../../controllers/userController.js'

export default class RoomCheckEvent {
    constructor() {
    }

    static checkRoomsForUsersInside(socketServer, user) {
        socketServer.to(user.chatroom).emit('roomUsers', {
            chatroom: user.chatroom,
            users: UserController.getRoomUsers(user.chatroom)
        })
    }

}
