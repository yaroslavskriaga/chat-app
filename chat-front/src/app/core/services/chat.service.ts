import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CheckInInterface } from '@app/models/check-in.interface';
import { MessageInterface } from '@app/models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly socket: Socket;


  constructor() {
    this.socket = io(environment.socketServer);
  }

  public chatMessage(message: string) {
    this.socket.emit('ChatMessage', message);
  }

  public message(): Observable<MessageInterface> {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }

  public roomCheckIn(): Observable<CheckInInterface> {
    return new Observable((observer) => {
      this.socket.on('roomUsers', (roomUsers: CheckInInterface) => {
        observer.next(roomUsers);
      });
    });
  }

  public joinRoom(username: string, chatroom: string) {
    this.socket.emit('joinRoom', {username, chatroom});
  }

  public disconnect(): Socket {
    return this.socket.disconnect()
  }

  public connect(): Socket {
    return this.socket.connect()
  }

}