import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  // Restriction de l'accés a une route par l'usage du service
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Si l'utilisateur est connecté renvoyé true
    if (this.hardcodedAuthenticationService.isUserLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
