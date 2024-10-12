import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'in28minutes';
  password: string = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor() {}

  ngOnInit() {}

  handleLogin(): void {
    // console.log(`The username ${this.username} and the ${this.password}`);
    if (this.username === 'in28minutes' && this.password === 'dummy') {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
