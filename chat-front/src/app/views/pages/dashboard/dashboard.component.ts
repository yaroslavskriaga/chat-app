import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '@app/core/services/socket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from '@app/core/services/session.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit, DoCheck {
  @ViewChild('inputMessage') input: ElementRef;

  public form = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private socketService: SocketService, private sessionService: SessionService) {
  }

  ngDoCheck() {
    this.socketService.joinChatRoom(this.sessionService.get('username'), this.sessionService.get('chatroom'));
  }

  ngOnInit(): void {
  }

  public printMessage(event: Event): void {
    event.preventDefault()

    this.socketService.submitMessage(this.form.value)

    this.form.get('message').setValue('test');

    this.input.nativeElement.focus();
  }

  public outputMessage(message) {
    const div = document.createElement('div')
    const chatMessages = document.querySelector('.chat-messages')

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


}
