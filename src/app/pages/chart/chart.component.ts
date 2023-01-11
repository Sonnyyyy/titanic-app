import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Color, LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Chart } from 'src/app/models/chart';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  displayChart: boolean = false;
  chart: Chart[] = [];
  passengers: Passenger[] = [];
  averageAge: number = 0;
  standardDeviation: number = 0;

  view: [number, number] = [800, 450];
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition = LegendPosition.Below;
  colorScheme = {
    domain: ['#C94D6D', '#E4BF58', '#4174C9', '#3C9D4E', '#7031AC']
  } as string | Color;

  constructor(
    private data: DataService,
    public search: SearchService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPassengers();
  }

  async getPassengers(){
    this.passengers = await this.data.getPassengers();
    let survivors: Passenger[] = []
    this.passengers.forEach(passenger => {
      if(passenger.Survived){
        survivors.push(passenger);
      }
    });
    this.passengers = survivors;
    if(this.search.by == "gender"){
      this.filterByGender();
    }
    if(this.search.by == "age"){
      this.filterByAge();
      this.calculateAverage();
    }
    if(this.search.by == "class"){
      this.filterByClass();
    }
  }

  filterByGender(){
    this.chart = [
      {
        name: "male",
        value: 0
      },
      {
        name: "female",
        value: 0
      }
    ];
    this.passengers.forEach(passenger => {
      if(passenger.Sex == "male"){
        this.chart[0].value += 1
      }
      if(passenger.Sex == "female"){
        this.chart[1].value += 1
      }
    });
    this.displayChart = true;
  }

  filterByAge(){
    this.chart = [
      {
        name: "0-15",
        value: 0
      },
      {
        name: "16-30",
        value: 0
      },
      {
        name: "31-45",
        value: 0
      },
      {
        name: "46-60",
        value: 0
      },
      {
        name: "61+",
        value: 0
      }
    ];
    this.passengers.forEach(passenger => {
      if(passenger.Age < 16){
        this.chart[0].value += 1
      }
      if(passenger.Age < 31){
        this.chart[1].value += 1
      }
      if(passenger.Age < 46){
        this.chart[2].value += 1
      }
      if(passenger.Age < 61){
        this.chart[3].value += 1
      }
      if(passenger.Age >= 61){
        this.chart[4].value += 1
      }
    });
    this.displayChart = true;
  }

  filterByClass(){
    this.chart = [
      {
        name: "1st class",
        value: 0
      },
      {
        name: "2nd class",
        value: 0
      },
      {
        name: "3rd class",
        value: 0
      }
    ];
    this.passengers.forEach(passenger => {
      if(passenger.Pclass == 1){
        this.chart[0].value += 1
      }
      if(passenger.Pclass == 2){
        this.chart[1].value += 1
      }
      if(passenger.Pclass == 3){
        this.chart[2].value += 1
      }
    });
    this.displayChart = true;
  }

  calculateAverage(){
    let sum: number = 0;
    let count: number = 0;
    this.passengers.forEach(passenger => {
      sum += passenger.Age;
      count += 1;
    });
    this.averageAge = sum / count;
    this.calculateDeviation();
  }

  calculateDeviation(){
    let sum: number = 0;
    let count: number = 0;
    this.passengers.forEach(passenger => {
      sum += Math.pow(Math.abs(passenger.Age - this.averageAge), 2);
      count += 1;
    });
    this.standardDeviation = Math.sqrt(sum / count);
  }

  reset(){
    this.router.navigate(['search'])
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['login'])
  }
}
