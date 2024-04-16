import { Routes } from "@angular/router";
import { AssistantsComponent } from "../../modules/ecbot/pages/assistants/assistants.component";
import { InitialConfigurationComponent } from "../../modules/ecbot/pages/initial-configuration/initial-configuration.component";
import { IntegrationsComponent } from "../../modules/ecbot/pages/integrations/integrations.component";
import { ProofComponent } from "../../modules/ecbot/pages/proof/proof.component";
import { ReportsComponent } from "../../modules/ecbot/pages/reports/reports.component";
import { UsersComponent } from "../../modules/ecbot/pages/users/users.component";
import { AbmUsersComponent } from "../../modules/ecbot/pages/abm-users/abm-users.component";

export const adminRoutes: Routes = [
  {
    path: 'mis-asistentes',
    component: AssistantsComponent,
  },
  {
    path: 'integraciones',
    component: IntegrationsComponent,
  },
  {
    path: 'pruebas',
    component: ProofComponent,
  },
  {
    path: 'configuracion-inicial',
    component: InitialConfigurationComponent,
  },
  {
    path: 'editar-agente/:id',
    component: InitialConfigurationComponent,
  },
  {
    path: 'reportes',
    component: ReportsComponent,
  },

  // ABM Usuarios-------------------------------------
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'usuarios/nuevo',
    component: AbmUsersComponent
  },
  {
    path: 'usuarios/editar/:id',
    component: AbmUsersComponent
  },

  //Page 404------------------------------------------
  {
    path: '**',
    redirectTo: 'mis-asistentes'
  }
];
