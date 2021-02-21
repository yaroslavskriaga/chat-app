import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    console.log(this.form.value)
    this.sessionService.set('username', this.form.get('username').value)
    this.sessionService.set('password', this.form.get('password').value)
  }

}

