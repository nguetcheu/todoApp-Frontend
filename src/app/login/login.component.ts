import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'nguetcheu';
  password: string = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  handleLogin(): void {
    // console.log(`The username ${this.username} and the ${this.password}`);
    if (this.username === 'nguetcheu' && this.password === 'dummy') {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }
}
