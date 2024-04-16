import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  menu = [
    {
      link: 'configuracion-inicial',
      iconColor: 'icon-blue',
      icon: 'bx bx-wrench',
      title: 'Configuración Inicial'
    },
    {
      link: 'integraciones',
      iconColor: 'icon-warning',
      icon: 'icon-integracion',
      title: 'Integraciones'
    },
    {
      link: 'pruebas',
      iconColor: 'icon-success',
      icon: 'bx bxs-flask',
      title: 'Prueba'
    },
    {
      link: 'reportes',
      iconColor: 'icon-danger',
      icon: 'bx bx-message-alt-error',
      title: 'Reportes'
    }
  ]

}
