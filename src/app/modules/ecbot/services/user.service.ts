import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getPaginatedUsers(){
    return [
      {id: 1, name: 'John Cramer', email: 'john@mail.com', status: 'Activo', role: 'Admin', created_at: '2022-01-01', updated_at: '2022-01-01'},
      {id: 2, name: 'Axel Ross', email: 'axel@mail.com', status: 'Activo', role: 'User', created_at: '2022-01-01', updated_at: '2022-01-01'},
      {id: 3, name: 'Tom Hands', email: 'tom@mail.com', status: 'Activo', role: 'Test', created_at: '2022-01-01', updated_at: '2022-01-01'},
    ]
  }
}
