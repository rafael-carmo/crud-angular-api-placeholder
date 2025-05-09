import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const userService = inject(UserService);
  const token = userService.obterTokenUsuario;
  const requestUrl: Array<any> = req.url.split('/');
  const apiUrl: Array<any> = environment.apiUrl.split('/');

  if (token && requestUrl[2] === apiUrl[2]) {
    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
            token: `${token}`
        }
    });

    return next(req)
      .pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401){
              userService.deslogar();
              // Return an Observable after deslogar()
              return throwError(() => new Error('Unauthorized access - user logged out'));
            }
            else
              return throwError(() => error);
          }
        )
      );
  } else {
      return next(req);
  }

};

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private usuarioService : UserService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       const token = this.usuarioService.obterTokenUsuario;
//       const requestUrl: Array<any> = request.url.split('/');
//       const apiUrl: Array<any> = environment.apiUrl.split('/');
      
//       if (token && requestUrl[2] === apiUrl[2]) {
//           request = request.clone({
//               setHeaders: {
//                   Authorization: `Bearer ${token}`,
//                   token: `${token}`
//               }
//           });
//           return next.handle(request).pipe(catchError(error => {
//               if (error instanceof HttpErrorResponse && error.status === 401)
//                 this.usuarioService.deslogar();
//               else
//                 return throwError(error.message);
//           }));
//       }
//       else {
//           return next.handle(request);
//       }
//   }
// }
