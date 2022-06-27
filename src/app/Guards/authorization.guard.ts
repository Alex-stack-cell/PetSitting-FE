import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (localStorage.getItem('auth_meta') != undefined) {
      return true;
    } else {
      alert('Veuillez-vous connecter,svp.');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
