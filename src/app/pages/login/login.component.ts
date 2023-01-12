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
  //user is initialized to have the correct user ready to log in, this is just for the demo
  user: User = {username: "dave", password: "pass123"}
  wrongAlert: boolean = false;
  takenAlert: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ){
    //hides the login/logout at the top rght of the screen
    this.auth.loggingIn = true;
  }

  //calls to auth service to check if the user logs in, if yes go to search, if no show an alert
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

  //calls to auth service to check if the name is available, if yes go to search, if no show an alert
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
