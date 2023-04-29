import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HeaderService } from '../service/header.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private route: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token) {
        this.headerService.setheader('default', 'Authorization', token);
      }
      return true;
    } else {
      this.route.navigate(['/signin']);
      return false;
    }
  }
}
