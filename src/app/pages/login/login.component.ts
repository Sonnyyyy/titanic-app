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
  user: User = {username: "dave", password: "pass123"}
  wrongAlert: boolean = false;
  takenAlert: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ){
    this.auth.loggingIn = true;
  }

  login(){
    this.auth.login(this.user).then((loggedIn) => {
      if(loggedIn){
        this.auth.loggingIn = false;
        this.router.navigate(['search'])
      }
      else{
        this.wrongAlert = true;
      } 
    })
  }

  signin(){
    this.auth.signin(this.user).then((loggedIn) => {
      if(loggedIn){
        this.auth.loggingIn = false;
        this.router.navigate(['search'])
      }
      else{
        this.takenAlert = true;
      } 
    })
  }
}
