import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

import { AgentList } from '../../interfaces/agents.interface';
import { AgentService } from '../../services/agent.service';
import { general } from '../../../../shared/constant/general.constant';
import { Integration, IntegrationTypes } from '../../interfaces/integrations.interface';
import { IntegrationService } from '../../services/integration.service';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { TableIntegrationsComponent } from '../../components/table-integrations/table-integrations.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [
    CommonModule,
    TableIntegrationsComponent,
    NgSelectModule,
    FormsModule,
    InputSearchComponent
  ],
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss',
})
export class IntegrationsComponent {

  @ViewChild('modalIntegrationForm') modal!: TemplateRef<any>;
  @ViewChild(TableIntegrationsComponent) tableIntegration!: TableIntegrationsComponent;

  isSaving: boolean = false;
  id: number | null = null;

  integrationForm:Integration = {
    agentId: null,
    integrationTypeId: null,
    name: '',
    urlWS: '',
  };

  agents:AgentList[] = [];
  integrationTypes:IntegrationTypes[] = [];


  constructor(
    private agentService      : AgentService,
    private integrationService: IntegrationService,
    private modalService      : NgbModal,
    private navbarService     : NavbarService,
    private toastr            : ToastrService
  ) {}

  ngOnInit(): void {
    this.navbarService.setTitle('Integraciones', 'ecbot/mis-asistentes');
    this.uploadSelects();
  }

  // Getters--------------------------------------------------------------------------------
  get isInvalid() {
    return (
      this.isSaving
      || !this.integrationForm.agentId
      || !this.integrationForm.integrationTypeId
      || !this.integrationForm.name
      || !this.integrationForm.urlWS
    );
  }

  // METHODS--------------------------------------------------------------------------------

  openModal() {
    this.clearForm();
    this.modalService.open(this.modal , {size: 'lg'});
  }

  searchIntegrations(search:string){
    this.tableIntegration.data.searchWords = search;
    this.tableIntegration.getIntegrations();
  }

  uploadSelects(){
    this.agentService.getAgents().subscribe(res => this.agents = res);
    this.integrationService.getTypesIntegrations().subscribe(res => this.integrationTypes = res);
  }

  clearForm(){
    this.integrationForm = {
      agentId: null,
      integrationTypeId: null,
      name: '',
      urlWS: '',
    };
  }

  /**
   * Edita una integración
   * @param row Integración
   */
  editIntegration(row: Integration){
    this.id = row.id ?? null;
    this.integrationForm.agentId = row.agentId;
    this.integrationForm.integrationTypeId = row.integrationTypeId;
    this.integrationForm.name = row.name;
    this.integrationForm.urlWS = row.integrationData![0].data;
    this.modalService.open(this.modal , {size: 'lg'});
  }

  /**
   * Inserta o actualiza una integración
   */
  async onSubmit(){
    try {
      this.isSaving = true;

      let resp$ = this.integrationService.create(this.integrationForm);
      if(this.id) resp$ = this.integrationService.update(this.integrationForm, this.id);
      const resp = await lastValueFrom(resp$);

      this.toastr.success(resp.message);
      this.tableIntegration.getIntegrations();
      this.clearForm();
      this.modalService.dismissAll();

    } catch (error) {
      this.toastr.error(general.ERROR_MESSAGE);

    } finally {
      this.isSaving = false;
    }
  }
}
