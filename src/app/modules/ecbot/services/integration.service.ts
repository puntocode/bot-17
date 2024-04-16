import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IntegrationTypes, IntegrationsPaginated } from '../interfaces/integrations.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  private apiUrl = `${environment.backendApi}/integration`;

  constructor(private http: HttpClient) { }

  create(data = {}){
    return this.http.post<any>(this.apiUrl, data);
  }

  update(data = {}, id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTypesIntegrations(): Observable<IntegrationTypes[]>{
    return this.http.get<IntegrationTypes[]>(`${this.apiUrl}/integration-types-list`);
  }

  getPaginatedIntegrations(data = {}):Observable<IntegrationsPaginated>{
    return this.http.post<IntegrationsPaginated>(`${this.apiUrl}/integration-list`, data);
  }
}
