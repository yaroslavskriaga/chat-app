import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@app/core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    chatroom: new FormControl('', Validators.required),
  });

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.sessionService.setValue('username', this.form.get('username').value)
    this.sessionService.setValue('chatroom', this.form.get('chatroom').value)
    this.sessionService.setValue('access', true)

    this.navigateDashboard();
  }

  private navigateDashboard() {
    this.router.navigate(['/dashboard']).then()
  }

}

