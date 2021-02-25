import moment from 'moment'

export default class Message {
    constructor(username, text) {
        this.username = username
        this.text = text
        this.time = moment().format('h:mm a')
    }
}
