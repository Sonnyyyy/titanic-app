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

  //ngx-charts options
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

  //get the passengers from DataService, then keep only the survivors and filter those by the selected search
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

  //populate the chart array with the stats, in the correct format
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

  //populate the chart array with the stats, in the correct format
  filterByAge(){
    this.chart = [
      {
        name: "0-12",
        value: 0
      },
      {
        name: "13-25",
        value: 0
      },
      {
        name: "26-37",
        value: 0
      },
      {
        name: "38-50",
        value: 0
      },
      {
        name: "51+",
        value: 0
      }
    ];
    this.passengers.forEach(passenger => {
      if(!isNaN(passenger.Age)){
        if(passenger.Age < 13){
          this.chart[0].value += 1
        }
        if(passenger.Age < 26){
          this.chart[1].value += 1
        }
        if(passenger.Age < 38){
          this.chart[2].value += 1
        }
        if(passenger.Age < 51){
          this.chart[3].value += 1
        }
        if(passenger.Age >= 51){
          this.chart[4].value += 1
        }
      }
    });
    this.displayChart = true;
  }

  //populate the chart array with the stats, in the correct format
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
      if(!isNaN(passenger.Pclass)){
        if(passenger.Pclass == 1){
          this.chart[0].value += 1
        }
        if(passenger.Pclass == 2){
          this.chart[1].value += 1
        }
        if(passenger.Pclass == 3){
          this.chart[2].value += 1
        }
      }
    });
    this.displayChart = true;
  }

  //calculate the average age of the survivors, then calculate the standard deviation
  calculateAverage(){
    let sum: number = 0;
    let count: number = 0;
    this.passengers.forEach(passenger => {
      if(!isNaN(passenger.Age)){
        sum += passenger.Age;
        count += 1;
      }
    });
    this.averageAge = Math.round((sum / count) * 10) / 10;
    this.calculateDeviation();
  }

  calculateDeviation(){
    let sum: number = 0;
    let count: number = 0;
    this.passengers.forEach(passenger => {
      if(!isNaN(passenger.Age)){
        sum += Math.pow(Math.abs(passenger.Age - this.averageAge), 2);
        count += 1;
      }
    });
    this.standardDeviation = Math.round(Math.sqrt(sum / count) * 10) / 10;
  }

  //reset the reach, go back to the search page
  reset(){
    this.router.navigate(['search'])
  }
}
