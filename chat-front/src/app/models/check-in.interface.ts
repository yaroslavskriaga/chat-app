import { UserInterface } from '@app/models/user.interface';

export interface CheckInInterface {
  chatroom: string;
  users: UserInterface[];
}

