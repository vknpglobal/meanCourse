import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;
  isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000/api";
  }
  loginUser(uri: String, body) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, body);
  }
}
