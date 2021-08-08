import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';
import { Employee } from './Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'homepage',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(private _demoService: DemoService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllEmployeeData();
  }

  uodateObj: Employee = null;
  searchBoxVal = "";
  employees: Employee[];
  updateHidden = true;
  sortBy = 1; // asc,-1 desc
  retVal = 0;
  updateResp;
  respHidden = true;

  getAllEmployeeData() {
    this.updateHidden = true;
    this._demoService.getAllData().subscribe(data => {
      this.employees = data.body;
    });
  }

  enableUpdateDataModal(dataObj) {
    this.uodateObj = dataObj;
    this.updateHidden = false;
  }

  updateDataById(id) {
    this.uodateObj.id = id;
    this.uodateObj.name = (document.getElementById("updatedName") as HTMLInputElement).value
    this.uodateObj.email = (document.getElementById("updatedEmail") as HTMLInputElement).value
    this.uodateObj.location = (document.getElementById("updatedLocation") as HTMLInputElement).value

    this._demoService.updateData(id, this.uodateObj).subscribe(updateStatusResp => {
      this.updateResp = updateStatusResp;
      if (this.updateResp.response === "Updated") {
        this._router.navigate(['overview']);
      }
      else {
        this.respHidden = false;
      }
    });
  }

  onKeyEventSearch(event) {
    this.searchBoxVal = (document.getElementById("searchBox") as HTMLInputElement).value
    if (this.searchBoxVal.length > 2) {
      this.getAllEmployeeDataBySearch(this.searchBoxVal);
    }
    if (event.keyCode === 13) {
      this.getAllEmployeeDataBySearch(this.searchBoxVal);
    }
  }

  getAllEmployeeDataBySearch(searchText) {
    if (searchText === '') {
      searchText = "All";
    }
    this._demoService.getAllDataBySearchText(searchText).subscribe(data => {
      this.employees = data.body;
    });
  }

  clickForSort(event, name) {
    let target = event.currentTarget,
    classList = target.classList;

    if (classList.contains('sort-by-asc')) {
      classList.remove('sort-by-asc');
      classList.add('sort-by-desc');

      this.sortBy = -1;
    }
    else {
      classList.add('sort-by-asc');
      classList.remove('sort-by-desc');

      this.sortBy = 1;
    }
    this.sortArr(name);
  }

  sortArr(colName: any) {
    this.employees.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortBy;

      // if (a === b) {
      //   this.retVal = 1 * this.sortBy;
      // }
      // else if (b < a) {
      //   this.retVal = 0 * this.sortBy;
      // }
      // else if (b > a) {
      //   this.retVal = -1 * this.sortBy;
      // }
      // return this.retVal;
    });
  }
}
