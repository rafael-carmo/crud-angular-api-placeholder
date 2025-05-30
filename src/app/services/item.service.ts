import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // private endpoint = 'todos';// Endpoint da API (usando JSONPlaceholder como exemplo)
  private endpoint = 'items';// Endpoint da API springboot

  constructor(private apiService: ApiService) { }

  getItems(params?: HttpParams): Observable<any> {
    return this.apiService.get<any>(this.endpoint, params);
  }
  // getItems(pageSize: number, pageIndex: number): Observable<any> {
  //   const params = `?size=${pageSize}&page=${pageIndex}`;
  //   return this.apiService.get<any>(`${this.endpoint}${params}`);
  // }

  getById(id: number): Observable<Item> {
    return this.apiService.get<Item>(`${this.endpoint}/${id}`);
  }

  create(item: Item): Observable<Item> {
    return this.apiService.post<Item>(`${this.endpoint}`, item);
  }

  update(id: number | string, item: Item): Observable<Item> {
    return this.apiService.put<Item>(`${this.endpoint}`, id, item);
  }

  delete(id: number | string): Observable<Item> {
    return this.apiService.delete<Item>(`${this.endpoint}`, id);
  }
}
