import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: this.getHeaders()
    })
    console.log(request);


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event);
        }
        return event;
      })
    );
  }

  getHeaders() {
    let timeStamp = new Date().getTime() + '';
    let headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      timestamp: timeStamp,
    };
    if (sessionStorage.getItem("token")) {
      headers.Authorization = 'Bearer ' + sessionStorage.getItem("token")
    }
    return headers;
  }
}
