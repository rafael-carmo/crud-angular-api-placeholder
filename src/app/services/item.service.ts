import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // private endpoint = 'todos';// Endpoint da API (usando JSONPlaceholder como exemplo)
  private endpoint = 'items';// Endpoint da API springboot

  constructor(private apiService: ApiService) { }

  getItems(): Observable<Item[]> {
    return this.apiService.get<Item[]>(this.endpoint);
  }

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
