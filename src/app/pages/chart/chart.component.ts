import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Color, LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Chart } from 'src/app/models/chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  displayChart: boolean = false;
  chart: Chart[] = [
    {
      name: "male",
      value: 0
    },
    {
      name: "female",
      value: 0
    }
  ];
  passengers: Passenger[] = [];
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Below;
  colorScheme = {
    domain: ['#3b85c0', '#fb7b8b', '#294679']
  } as string | Color;

  constructor(
    private data: DataService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPassengers();
    
  }

  async getPassengers(){
    this.passengers = await this.data.getPassengers();
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

  reset(){
    this.router.navigate(['search'])
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['login'])
  }
}
