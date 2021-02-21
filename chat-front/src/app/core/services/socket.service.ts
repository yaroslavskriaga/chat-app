import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message: unknown;

  constructor(private socket: Socket) {
  }


  public messageReceiver(outPutMessage): void {
    this.socket.on('message', message => {
      this.message = message;
      outPutMessage(message);
    })
  }

  public joinChatRoom(username, chatroom): void {
    this.socket.emit('joinRoom', {username, chatroom})
  }

  public refreshInformationAboutRoomAndUsersInside(outputUsers, outputRoomName): void {
    this.socket.on('roomUsers', ({chatroom, users}) => {
      outputUsers(users)
      outputRoomName(chatroom)
    })
  }

  public submitMessage(message): void {
    this.socket.emit('ChatMessage', message)
  }

}
