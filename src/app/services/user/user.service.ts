import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private router: Router
  ) { }

  logar(user: User): Observable<any> {
        /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/
      return this.mockUserLogin(user).pipe(tap((response) => {
        if(!response.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI')));
        localStorage.setItem('user', btoa(JSON.stringify(user)));
        this.router.navigate(['']);
      }))
  }

  private mockUserLogin(user: User): Observable<any> {
    var returnMock: any = [];
    if(user.email === 'rafael@email.com' && user.password === '123') {
      returnMock.sucesso = true;
      returnMock.user = user;
      returnMock.token = 'TokenQueSeriaGeradoPelaAPI';
      return of(returnMock);
    }
      returnMock.sucesso = false;
      returnMock.usuario = user;

    return of(returnMock);
  }

  deslogar(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  // get obterUsuarioLogado(): User {
  //   return localStorage.getItem('user')
  //     ? JSON.parse(atob(localStorage.getItem('user'))) as User
  //     : null;
  // }
  // get obterIdUsuarioLogado(): string {
  //   return localStorage.getItem('usuario')
  //     ? (JSON.parse(atob(localStorage.getItem('usuario'))) as IUsuario).id
  //     : null;
  // }
  // get obterTokenUsuario(): string {
  //   return localStorage.getItem('token')
  //     ? JSON.parse(atob(localStorage.getItem('token')))
  //     : null;
  // }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
