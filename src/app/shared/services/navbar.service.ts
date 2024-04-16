import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private titleSubject = new BehaviorSubject<string>('Bienvenido');
  public title$ = this.titleSubject.asObservable();

  private backSubject = new BehaviorSubject<string | null>(null);
  public back$ = this.backSubject.asObservable();

  setTitle(title: string, back:string | null = null) {
    this.titleSubject.next(title);
    this.backSubject.next(back);
  }

}
