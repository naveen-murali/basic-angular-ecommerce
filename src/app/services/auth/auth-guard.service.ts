import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouteEnum } from 'src/app/enums';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const isUserIn = this._authService.userDetails.token ? true : false;

    let canActivate: boolean = true;
    let path = route.url[0].path;

    if (
      !isUserIn &&
      !(path === RouteEnum.SIGNIN || path === RouteEnum.SIGNUP)
    ) {
      canActivate = false;
      this._router.navigate([RouteEnum.SIGNIN]);
    } else if (
      isUserIn &&
      (path === RouteEnum.SIGNIN || path === RouteEnum.SIGNUP)
    ) {
      canActivate = false;
      this._router.navigate([RouteEnum.HOME]);
    }

    return canActivate;
  }
}
