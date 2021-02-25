import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '@app/core/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authMessage = 'Sorry, authorization error. Please, login.'
  private readonly authMessageAction = 'Close'

  constructor(private sessionService: SessionService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  public hasAccess(): boolean {
    return this.sessionService.getValueByKey('access');
  }

  public canActivate(): boolean {
    if (!this.hasAccess()) {
      this.router.navigate(['/login']).then(() => this._snackBar.open(this.authMessage, this.authMessageAction, {
        duration: 10000,
      }))
    }
    return this.hasAccess();
  }

}
