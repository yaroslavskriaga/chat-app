const socket = io()
const chatMessages = document.querySelector('.chat-messages')
const chatForm = document.getElementById('chat-form')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


socket.on('message', message => {
    outputMessage(message)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('ChatMessage', msg)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML =
        `                
                <p class="meta">${message.username} <span>${message.time}</span></p>
                <p class="text">
                    ${message.text}
                </p>
        `
    document.querySelector('.chat-messages').appendChild(div)

    chatMessages.scrollTop = chatMessages.scrollHeight
}

const {username, chatroom} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', {username, chatroom})

socket.on('roomUsers', ({chatroom, users}) => {
    outputUsers(users)
    outputRoomName(chatroom)
})



function outputRoomName(chatroom) {
    roomName.innerText = chatroom
}

function outputUsers(users) {
    userList.innerHTML = `
                        ${users.map(user => `<li>${user.username}</li>`).join('')}
                          `
}
