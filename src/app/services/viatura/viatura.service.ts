import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaturaService {

  private endpoint = 'getCountAllViaturas'; // Endpoint da API springboot

  constructor(private apiService: ApiService) { }

  getTotalViaturas(params?: HttpParams): Observable<any> {

    return this.apiService.get2<any>(this.endpoint, params);
  }

  getTotalByTipoAbastecimento(params?: HttpParams): Observable<any> {
    return this.apiService.get2<any>('countByTipoAbastecimento', params);
  }


}
