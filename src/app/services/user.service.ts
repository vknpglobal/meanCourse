import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000/api";
  }


  getAllUsers(uri: String) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }

  addUser(uri: String, user: Object) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, user);
  }

  editUser(uri: String, body) {
    return this.http.patch<any>(`${this.ROOT_URL}/${uri}`, body);
  }

  deleteUser(uri:String) {
    return this.http.delete<any>(`${this.ROOT_URL}/${uri}`);
  }


}
