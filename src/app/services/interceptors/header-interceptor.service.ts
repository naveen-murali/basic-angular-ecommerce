import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { InterceptHeaders } from 'src/app/enums/http.enum';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const TOKEN = this._authService.userDetails.token;

    let newReq = {} as HttpRequest<any>;

    if (req.headers.get(InterceptHeaders.SKIP)) {
      req.headers.delete(InterceptHeaders.SKIP);
      newReq = req.clone();
    } else {
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    }

    return next.handle(newReq);
  }
}
