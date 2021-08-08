import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo/demo.service';
import { Employee } from '../demo/Employee';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private _demoService: DemoService) {}

  ngOnInit(): void {
    this.getAllEmployeeData();
  }

  updatedEmployees: Employee[];

  getAllEmployeeData(){
    this._demoService.getAllData().subscribe(data => {
      this.updatedEmployees = data.body;

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(this.updatedEmployees));
    });
  }
}
