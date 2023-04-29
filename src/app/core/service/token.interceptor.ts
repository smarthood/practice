import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isRefreshingToken!: boolean;
  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept');
    // let tokenizedReq = request.clone({
    //   setHeaders: {
    //     Authorization: 'U2FsdGVkX19Kgr8xpwYTmKrtzBHpf5ApMxnc+s1T4NO7kbJRoEIofUXToLe4Kmh3B6Eu8aRRhx9nMLMBQwP8xhjasaHXYNJYt6jh1+rTJ6bmLKC4KB9h4nr9iMWaZQy/hgpfaF9jFK11pQq8TQ3TdxvlobY801ysrm4RgJQDLiSmxEUyVXs+DSD5CNjr2+mndp33rWhNZCntxH/MQXLlJ1z5S+E49wKialYtnJ1HAp1J+7TuS+fWOn5XEm2A9EsDsjooKf7RsdCxWNGRuUYzBB896iHrCiGOZgyt3umBOIpe0dH3P2vroobvhLHyMrl+'
    //   }
    // })
    // return next.handle(tokenizedReq)

    return next.handle(this.setHeaders(request)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handleError(request, next);
        }
        return throwError(err);
      })
    );
  }

  handleError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);
      return this.authService.getRefreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshingToken = false;
          this.refreshTokenSubject.next(token['aceessToken']);
          this.headerService.setheader(
            'default',
            'Authorization',
            token['accessToken']
          );
          sessionStorage.setItem('token', token['accessToken']);
          return next.handle(this.setHeaders(request));
        }),
        catchError((err: any) => {
          console.log(err);
          this.isRefreshingToken = false;
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((jwtToken) => next.handle(this.setHeaders(request)))
      );
    }
  }
  setHeaders(request: HttpRequest<any>) {
    console.log('setHeaders intercept', request.url);
    const headers = this.headerService.getHeaders(request.url);
    return headers
      ? request.clone({
          setHeaders: headers,
        })
      : request;
  }
}
