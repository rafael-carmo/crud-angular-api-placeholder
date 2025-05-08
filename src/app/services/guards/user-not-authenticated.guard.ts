import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';

// export const userNotAuthenticatedGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class UserNotAuthenticatedGuard implements CanActivate{
    constructor(
      private userService: UserService,
      private router: Router) { }
    canActivate(){
      if (this.userService.getLogado()) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}
