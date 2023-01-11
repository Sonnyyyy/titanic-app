import { Injectable, OnInit } from '@angular/core';
import { collection, query, where } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string = "";
  loggingIn: boolean = false;

  constructor(
    private db: AngularFirestore
  ) {}

  //check if user corresponds to any of the users. if yes, set username and return true
  login(user: User): Promise<boolean>{
    return new Promise((resolve) => {
      let users = this.db.collection<User>('users', ref => ref.where("username", "==", user.username).where("password", "==", user.password)).valueChanges() as Observable<User[]>
      users.pipe(take(1)).subscribe((matchingUsers) => {
        if(matchingUsers.length){
          localStorage.setItem('username', user.username);
          this.username = user.username;
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  //check if username corresponds to any of the usernames. if no, add user, set username and return true
  signin(user: User): Promise<boolean>{
    return new Promise((resolve) => {
      let users = this.db.collection<User>('users', ref => ref.where("username", "==", user.username)).valueChanges() as Observable<User[]>
      users.pipe(take(1)).subscribe((matchingUsers) => {
        if(!matchingUsers.length){
          this.db.collection<User>('users').add(user)
          localStorage.setItem('username', user.username);
          this.username = user.username;
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  //set username to nothing
  logout(){
    localStorage.setItem('username', "");
    this.username = "";
  }
}
