import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@app/core/services/session.service';
import { removeSpaces } from '@app/shared/utils/input-validate-whitespace';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, removeSpaces]),
    chatroom: new FormControl('', [Validators.required]),
  });

  get formIsValid() {
    return this.loginForm.valid;
  }

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit(): void {
  }


  public submit(): void {
    if (this.loginForm.get('username').value.length === 0) {
      return;
    }
    this.sessionService.setValue('username', this.loginForm.get('username').value);
    this.sessionService.setValue('chatroom', this.loginForm.get('chatroom').value);
    this.sessionService.setValue('access', true);
    this.navigateDashboard();
  }

  private navigateDashboard() {
    this.router.navigate(['/dashboard']).then();
  }

}

