import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChatService } from '@app/core/services/chat.service';
import { SessionService } from '@app/core/services/session.service';
import { MessageInterface } from '@app/models/message.interface';
import { UserInterface } from '@app/models/user.interface';
import { CheckInInterface } from '@app/models/check-in.interface';
import { removeSpaces } from '@app/shared/utils/input-validate-whitespace';


@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  // Template
  public newMessageForm: FormGroup;
  public readonly ChatRoom = new ReplaySubject<string>();
  public readonly Users = new ReplaySubject<string[]>();
  @ViewChild('inputMessage') readonly input: ElementRef;
  @ViewChild('chatMessagesContainer') readonly chatMessagesContainer: ElementRef;
  // Component
  private readonly username: string = this.sessionService.getValueByKey('username');
  private readonly chatroom: string = this.sessionService.getValueByKey('chatroom');

  constructor(private chatService: ChatService,
              private sessionService: SessionService,
              private renderer: Renderer2,
              private router: Router) {
  }


  ngOnInit(): void {
    this.setUpNewMessageForm();
    this.chatService.connect();
    this.messageConnector();
    this.joinRoomConnector();
    this.roomCheckInConnector();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  public logout(): void {
    this.router.navigate(['/']).then(() => this.sessionService.clearStorage());
  }

  public pageReload(): void {
    window.location.reload();
  }

  public printMessage(): void {
    if (this.newMessageForm.get('message').value.length === 0) {
      return;
    }

    this.chatService.sendMessage(this.newMessageForm.get('message').value)
    this.newMessageForm.get('message').setValue('');
    this.input.nativeElement.focus();
  }

  private checkWhoIsWho(message: MessageInterface, newMessage: Object): void {
    switch (!!message.username) {
      case message.username === this.username :
        this.renderer.addClass(newMessage, 'my-message');
        break;
      case message.username === 'Admin':
        this.renderer.addClass(newMessage, 'system-message');
        break;
      case message.username !== 'Admin':
        this.renderer.addClass(newMessage, 'alien-message');
        break;
    }
  }

  private messageGenerator(message: MessageInterface): string {
    return `
                <p class="meta d-flex justify-content-between">${message.username} <span>${message.time}</span></p>
                <p class="text">
                    ${message.text}
                </p>
        `
  }

  private outputMessage(message: MessageInterface): void {
    const newMessage = this.renderer.createElement('mat-card');
    this.renderer.addClass(newMessage, 'message-card');
    this.renderer.addClass(newMessage, 'mat-card');

    this.checkWhoIsWho(message, newMessage);

    newMessage.innerHTML = this.messageGenerator(message);
    this.renderer.appendChild(this.chatMessagesContainer.nativeElement, newMessage);
    this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
  }

  private outputRoomName(chatroom: string): void {
    this.ChatRoom.next(chatroom);
  }

  private outputUsers(users: Array<UserInterface>): void {
    const userList = [];
    users.forEach((user: UserInterface) => {
      userList.push(user.username);
    })
    this.Users.next(userList);
  }

  private setUpNewMessageForm() {
    this.newMessageForm = new FormGroup({message: new FormControl('', [removeSpaces])});
  }

  private roomCheckInConnector(): Subscription {
    return this.chatService
      .roomCheckInListener()
      .pipe(untilDestroyed(this))
      .subscribe((roomConfig: CheckInInterface) => {
        this.outputRoomName(roomConfig.chatroom);
        this.outputUsers(roomConfig.users);
      }, error => console.error('[ERROR]', error));
  }

  private messageConnector(): Subscription {
    return this.chatService
      .messageListener()
      .pipe(untilDestroyed(this))
      .subscribe((message: MessageInterface) => {
        this.outputMessage(message);
      }, error => console.error('[ERROR]', error));
  }

  private joinRoomConnector(): void {
    this.chatService.joinRoom(this.username, this.chatroom);
  }

}
