import { Injectable } from '@angular/core';
import { UserModel } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public userModel = new UserModel();


  constructor() {
  }

  public set(key: string, value: string) {
    this.userModel[key] = value;
  }

  public get(key: string): string {
    return this.userModel[key]
  }

  public remove(key: string) {
    this.userModel[key] = null;
  }

  public clear() {
    this.userModel = new UserModel();
  }
}
