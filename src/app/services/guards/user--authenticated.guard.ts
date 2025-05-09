import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';

// export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
//   if(state.root.)
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router,
  ){}

  canActivate() {
    if(this.userService.logado){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}
