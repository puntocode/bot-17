import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Response } from '../interfaces/integrations.interface';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private apiUrl = `${environment.backendApi}/context`;

  constructor(private http: HttpClient) { }

  getContextByAgentId(agentId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${agentId}`);
  }

  updateContextByAgentId(agentId: number, context: string): Observable<Response>{
    return this.http.put<Response>(`${this.apiUrl}/${agentId}`, {context});
  }
}
