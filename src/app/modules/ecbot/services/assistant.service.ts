import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor() { }

  getPaginatedAssistans(data:any = {}){
    // return this.http.post<any>(`${this.apiUrl}/lista-kpi`, data);
    return [
      {id:1, name: 'Nombre 1', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:2, name: 'Nombre 2', status: 'Inactivo', updated_at: '2022-01-01', user: 'Admin'},
      {id:3, name: 'Nombre 3', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:4, name: 'Nombre 4', status: 'Inactivo', updated_at: '2022-01-01', user: 'Admin'},
      {id:5, name: 'Nombre 5', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:6, name: 'Nombre 6', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:7, name: 'Nombre 7', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:8, name: 'Nombre 8', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:9, name: 'Nombre 9', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:10, name: 'Nombre 10', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:11, name: 'Nombre 11', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:12, name: 'Nombre 12', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:13, name: 'Nombre 13', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:14, name: 'Nombre 14', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'},
      {id:15, name: 'Nombre 15', status: 'Activo', updated_at: '2022-01-01', user: 'Admin'}
    ];
  }
}
