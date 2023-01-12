import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    public search: SearchService,
    public auth: AuthService,
    private router: Router
  ) { }

  //navigate to the gender chart
  byGender(){
    this.search.by = "gender";
    this.router.navigate(['chart']);
  }

  //navigate to the age chart
  byAge(){
    this.search.by = "age";
    this.router.navigate(['chart']);
  }

  //navigate to the class chart
  byClass(){
    this.search.by = "class";
    this.router.navigate(['chart']);
  }
}
