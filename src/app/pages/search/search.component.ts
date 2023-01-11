import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public search: SearchService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(){
    this.router.navigate(['chart']);
  }

  byGender(){
    this.search.by = "gender";
    this.router.navigate(['chart']);
  }

  byAge(){
    this.search.by = "age";
    this.router.navigate(['chart']);
  }

  byClass(){
    this.search.by = "class";
    this.router.navigate(['chart']);
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['login']);
  }
}
