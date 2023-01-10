import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = {} as User
  allUsers: User[] = [{username: "dave", password: "password123"}]
  loggingIn: boolean = false;

  constructor(
    private router: Router
  ) {}

  //check if user corresponds to any of the users. if yes, set it as currentUser and return true
  login(user: User): boolean{
    for(let i in this.allUsers){
      if(user.username == this.allUsers[i].username && user.password == this.allUsers[i].password){
        this.currentUser = user;
        return true;
      }
    }
    return false;
  }

  //set currentUser to an empty user
  logout(){
    this.currentUser = {} as User;
  }
}
