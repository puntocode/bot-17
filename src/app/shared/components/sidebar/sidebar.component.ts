import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgbTooltipModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() close = false;

  items = [
    {link: 'mis-asistentes', icon: 'icon-asistente', title: 'Mis Asistentes'},
    {link: 'integraciones', icon: 'icon-integracion fs-13', title: 'Integraciones'},
    {link: 'pruebas', icon: 'bx bxs-flask', title: 'Pruebas'},
    {link: 'reportes', icon: 'bx bx-message-alt-error', title: 'Reportes'},
    {link: 'usuarios', icon: 'bx bx-user', title: 'Usuarios'},
  ]
}
