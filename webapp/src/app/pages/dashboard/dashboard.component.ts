import { Component, OnInit } from '@angular/core';
import {Dashbaordservice} from '../../services/dashboardservice';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dates = {
     from :  '',
     to: ''
  };
  sales = [];
  totalprofit = 0;
  constructor(private service: Dashbaordservice) { }

  ngOnInit(): void {
  }

  handleDateChange(event, point){
    this.dates[`${point}`] = event.target.value;
  }

  filterDashbaord(){
    if ((this.dates.to != '') && (this.dates.from != '')){
      this.service.filterDashbordData(this.dates).subscribe(
      (resp:any) => {
        if(resp.status){
          this.sales = resp.data;
          this.totalprofit = resp.totalprofit
        }
      }, (err) => {
        alert('failed to get sales');
      });
    }else{
      alert('Please provide from and to date');
    }
  }

}
