import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000/api";
  }

  getUsers(uri: string) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }
  getProducts(uri: string) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }


  addProduct(uri: string, product: Object) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, product);
  }


  deleteProduct(uri: string) {
    return this.http.delete<any>(`${this.ROOT_URL}/${uri}`);
  }
}
