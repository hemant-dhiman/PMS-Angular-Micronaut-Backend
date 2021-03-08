import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      //req = req.clone({
        //setHeaders: {
          //  Authorization: `Bearer ${currentUser.token}`,
          //},
          const cloned_req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + currentUser.access_token),
          });
               return next.handle(cloned_req);
             } else {
               return next.handle(req);
      //});
    }
    //return next.handle(req);
  }
}
