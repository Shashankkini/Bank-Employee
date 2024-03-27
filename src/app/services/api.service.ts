import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
url='http://localhost:8080/api/employees';

  postEmployee(data :any){
    return this.http.post<any>(this.url,data);
  }

  getEmployee(){
    return this.http.get<any>(this.url);
  }

  putData(data:any, id:number){
    return this.http.post<any>(`${this.url}/`+id,data)
  }
  deleteEmployeeById(id:number){
    return this.http.get(`${this.url}/`+id)
  }

  getEmployeeById(id: number){
    return this.http.get(`${this.url}/`+id+`/getElements`)
  }
}
