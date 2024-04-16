import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { authRoutes } from './shared/routes/auth.routes';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { adminRoutes } from './shared/routes/admin.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth', // Redirige a la página de inicio de sesión cuando la ruta principal está vacía.
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: authRoutes
  },
  {
    path: 'ecbot',
    component: AdminLayoutComponent,
    children: adminRoutes,
    // canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'auth', // Redirige a la página de inicio de sesión cuando la ruta no coincide con ninguna.
  }
]
