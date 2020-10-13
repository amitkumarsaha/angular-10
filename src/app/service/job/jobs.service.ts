import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(public httpClient: HttpClient) { }

  getJobs(): Observable<any>{
    let headers = new HttpHeaders()
    .append('Authorization', localStorage.getItem('id_token'))
    .append('Content-Type', 'application/json');

    return this.httpClient.get('http://localhost:3000/api/jobs', { headers: headers });
  }

  postJobs(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/api/jobs');
  }

}