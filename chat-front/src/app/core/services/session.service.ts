import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor(private storage: SessionStorageService) {
  }

  public setValue(key: any, value: any) {
    this.storage.store(key, value);
  }

  public getValueByKey(key: string): any {
    return this.storage.retrieve(key);
  }

  public clearStorage() {
    this.storage.clear();
  }
}
