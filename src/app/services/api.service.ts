import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  });

  constructor(private http: HttpClient) { }

  //metodos genericos para CRUD
  get<T>(endpoint: string): Observable<T> {
    console.log(`path: ${this.apiUrl}/${endpoint}`);
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.headers
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.headers
    });
  }

  put<T>(endpoint: string, id: number | string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data, {
      headers: this.headers
    });
  }

  delete<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`, {
      headers: this.headers
    });
  }
}
