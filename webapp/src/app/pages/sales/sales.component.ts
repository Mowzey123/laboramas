import { Component, OnInit } from '@angular/core';
import {Csvservice} from '../../services/csv-service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  sales = [
    {
      Region : 'Middle East and North Africa',
      Country	: 'Azerbaijan',
      ItemType	: 'Snacks',
      SalesChannel: 'Online',
      OrderPriority : 'C',
      OrderDate	: '10/8/2014',
      OrderID: '535113847',
      ShipDate: '10/23/2014',
      UnitsSold: '934',
      UnitPrice: '152.58',
      UnitCost	: '97.44',
      TotalRevenue: '142509.72',
      TotalCost: '91008.96',
      TotalProfit: '51500.76'
    }
  ];
  progressInfos: any;
  fileInfos: any;
  uploadService: any;
  message: string;
  file: any;

  constructor(
    private service: Csvservice
  ) { }

  ngOnInit(): void {
    this.getSales('')
  }

  // handle input file change
  fileChange(event){
    this.file = event.target.files[0];
  }

  // handle form submit
  uploadFiles() {
    this.service.upload(this.file).subscribe(
      (res: any) => {
          res.status ?
          this.getSales('File uploaded')
          :
          this.message = 'Failed to upload file';
      },
      err => {
       this.message = 'Failed to upload file';
      });
  }

  getSales(message: string){
    message !== '' ? this.message = message : '';
    this.service.getAllSales().subscribe((resp: any) => {
      resp.status ? this.sales = resp.data : alert('failed to get sales');
    }, (err) => {
      alert('failed to get sales');
    });
  }

}
