import { Routes } from "@angular/router";
import { LoginComponent } from "../../modules/auth/pages/login/login.component";

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'registror',
  //   component: RegisterComponent,
  // },
  {
    path: '**',
    redirectTo: 'login',
  }
];
