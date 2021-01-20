import UserController from '../../controllers/userController.js'
import MessageEvent from '../events/message.js'
import RoomCheckEvent from '../events/roomCheck.js'


export default class Disconnection {
    constructor(socket, socketServer) {
        socket.on('disconnect', () => {

            const userLefts = UserController.deleteUser(socket.id)

            if (userLefts) {
                return [
                    MessageEvent.broadCastToChatRoomLeft(socketServer, userLefts),
                    RoomCheckEvent.checkRoomsForUsersInside(socketServer, userLefts)
                ]
            }
        })
    }
}
