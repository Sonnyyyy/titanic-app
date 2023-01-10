import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: User = {username: "dave", password: "password123"}
  wrongAlert: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ){
    this.auth.loggingIn = true;
  }

  submit(){
    if(this.auth.login(this.login)){
      this.auth.loggingIn = false;
      this.router.navigate(['search'])
    }
    else{
      this.wrongAlert = true;
    } 
  }
}
