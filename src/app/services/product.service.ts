import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000/api";
  }

  getUsers(uri: String) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }
  getProducts(uri: String) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }


  addProduct(uri: String, product: Object) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, product);
  }

  editProduct(uri: String, body) {
    return this.http.patch<any>(`${this.ROOT_URL}/${uri}`, body);
  }

  deleteProduct(uri: String) {
    return this.http.delete<any>(`${this.ROOT_URL}/${uri}`);
  }
}
