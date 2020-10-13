import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from  "@angular/common/http";
import { User } from 'src/app/model/user/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JsonResponse } from 'src/app/model/response/jsonresponse';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  httpClient: HttpClient, private authService: AuthService) { }

  register(user: User): Observable<JsonResponse>{
    // console.log(user);
    let headers = new  HttpHeaders().append('Content-Type', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    return this.httpClient.post<JsonResponse>("http://localhost:3000/api/users", user, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  authenticate(user: User): Observable<User>{
    let headers = new  HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<User>("http://localhost:3000/api/users/authenticate", user, {headers: headers})
    .pipe(catchError(this.handleError));
  }

  getProfile(){
    let headers = new  HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.authService.getAuthToken());
    return this.httpClient.get<User>("http://localhost:3000/api/users/profile", {headers: headers})
    .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
