export const config = {
    app: {
        port: 3000,
        botName: 'Admin',
        welcomeMessage: 'Welcome to chat app!',
        // USER is a placeholder
        someoneJoinedChatMessage: 'USER joined the chat',
        someoneLeftChatMessage: 'USER has left the chat'
    },
    chat:{

    },
    cors:{
        origin: 'http://localhost:4200',
        credentials: true
    }
}
