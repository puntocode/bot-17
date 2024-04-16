import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/integrations.interface';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private apiUrl = `${environment.backendApi}/example`;

  constructor(private http: HttpClient) { }

  getExampleByAgentId(agentId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${agentId}`);
  }

  create(example = {}): Observable<Response>{
    return this.http.post<Response>(this.apiUrl, example);
  }

  update(example = {}, id:number): Observable<Response>{
    return this.http.put<Response>(`${this.apiUrl}/${id}`, example);
  }

  delete(id:number): Observable<Response>{
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }
}
