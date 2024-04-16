import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  title:string = '';
  back:string | null = null

  constructor(
    private navbarService: NavbarService,
    private router       : Router
  ) {}

  ngOnInit() {
    this.navbarService.title$.subscribe((title) => {
      this.title = title;
    });

    this.navbarService.back$.subscribe((back) => {
      this.back = back;
    });
  }

  goRoute() {
    if (!this.back) return;
    this.router.navigate([this.back]);
  }

  logout() {
    localStorage.removeItem('isLogged');
    this.router.navigate(['auth/login']);
  }

}
