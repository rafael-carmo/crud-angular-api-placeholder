import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { ApiService } from '../api.service';
import { LoginResponse } from '../../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpoint = 'auth';// Endpoint da API springboot

  constructor(
    // private httpClient: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  login(email: string, password: string) {
    return this.apiService.post<LoginResponse>(`${this.endpoint}/login`, {email, password}).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token)
        sessionStorage.setItem('username', response.name)
        // this.router.navigate(['']);
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.apiService.post<LoginResponse>(`${this.endpoint}/register`, {name, email, password}).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token)
        sessionStorage.setItem('username', response.name)
        // this.router.navigate(['']);
      })
    );
  }

}
