import { Component } from '@angular/core';
import { NavbarService } from '../../../../shared/services/navbar.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  constructor(
    private navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.navbarService.setTitle('Reporte', 'ecbot/mis-asistentes');
  }

}
