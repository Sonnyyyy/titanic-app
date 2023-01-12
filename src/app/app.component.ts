import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'titanic-app';

  constructor(
    public auth: AuthService,
    private router: Router
  ){}

  //onInit, get the username from storage
  ngOnInit(): void {
    this.auth.username = localStorage.getItem('username') as string
  }

  //logout button at the top right of the screen
  logout(){
    this.auth.logout()
    this.router.navigate(['login'])
  }
}
