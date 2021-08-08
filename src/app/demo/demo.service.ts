import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DemoService {
  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }
   getAllData() {
    return this.http.get<any>(this.url +"employees", {
      observe: 'response',
      headers: new HttpHeaders({
        'X-Application': 'Test'
      })
    });
  }

  getAllDataBySearchText(searchText) {
    return this.http.get<any>(this.url + "employees/search/" + searchText, {
      observe: 'response',
      headers: new HttpHeaders({
        'X-Application': 'Test'
      })
    });
  }

  updateData(id, updatedObj) {
    return this.http.put<any>(this.url + "employee/update/" + id, updatedObj, {
      headers: new HttpHeaders({
        'X-Application': 'Test'
      })
    });
  }

}

