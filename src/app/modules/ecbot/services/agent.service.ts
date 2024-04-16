import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Agent, AgentList, AgentPersonalities, AgentTypes, AgentsPaginated } from '../interfaces/agents.interface';
import { environment } from '../../../../environments/environment';
import { Response } from '../interfaces/integrations.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = `${environment.backendApi}/agents`;

  constructor(private http: HttpClient) { }

  getAgents(): Observable<AgentList[]>{
    return this.http.get<AgentList[]>(`${this.apiUrl}/agents-list`);
  }

  getAgentTypes(): Observable<AgentTypes[]>{
    return this.http.get<AgentTypes[]>(`${environment.backendApi}/agent-types`);
  }

  getAgentPersonalities(): Observable<AgentPersonalities[]>{
    return this.http.get<AgentPersonalities[]>(`${environment.backendApi}/personalities`);
  }

  getPaginatedAgents(data = {}): Observable<AgentsPaginated>{
    return this.http.post<AgentsPaginated>(`${this.apiUrl}/search-agents`, data);
  }

  getAgentById(id:string): Observable<Agent>{
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }

  create(data = {}): Observable<Response>{
    return this.http.post<Response>(this.apiUrl, data);
  }

  update(data = {}, id:string): Observable<Response>{
    return this.http.put<Response>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<Response>{
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }

}
