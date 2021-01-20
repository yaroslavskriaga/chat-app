import {users} from '../../db/db.js'
import User from '../models/user.js'

export default class UserController {

    constructor() {
    }

    /**
     * Add user
     **/
    static addUser(id, username, chatroom) {
        const user = new User(id, username, chatroom)
        users.push(user)
        return user
    }


    /**
     * Get user by id
     **/
    static getUser(id) {
        return users.find(user => user.id === id)
    }


    /**
     * Delete user
     **/
    static deleteUser(id) {
        const index = users.findIndex(user => user.id === id)
        if (index !== -1) {
            return users.splice(index, 1)[0]
        }
    }

    /**
     * Check room for users inside
     **/
    static getRoomUsers(chatroom) {
        return users.filter(user => user.chatroom === chatroom)
    }

}
