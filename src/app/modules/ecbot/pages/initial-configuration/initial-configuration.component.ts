import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Router } from '@angular/router';
import { Agent, AgentPersonalities, AgentTypes } from '../../interfaces/agents.interface';
import { AgentService } from '../../services/agent.service';
import { Company } from '../../interfaces/company.interface';
import { CompanyService } from '../../../../shared/services/company.service';
import { general } from '../../../../shared/constant/general.constant';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { InputPlaceholderComponent } from '../../../../shared/components/input-placeholder/input-placeholder.component';

@Component({
  selector: 'app-initial-configuration',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    LabelComponent,
    InputPlaceholderComponent
  ],
  templateUrl: './initial-configuration.component.html',
  styleUrl: './initial-configuration.component.scss',
})
export class InitialConfigurationComponent {

  agentPersonalities:AgentPersonalities[] = [];
  agentTypes: AgentTypes[] = [];
  companies: Company[] = [];
  isUploading: boolean = false;
  isSaving: boolean = false;
  id: string | null = null;

  agentForm:Agent = {
    additionalInformation: "",
    companyId: null,
    doNotSay: "",
    name: "",
    notToTalkAbout: "",
    personalityId: null,
    stateId: 1,
    typeId: null,
  };

  constructor(
    private navbarService : NavbarService,
    private agentService  : AgentService,
    private router        : Router,
    private routeActivated: ActivatedRoute,
    private companyService: CompanyService,
    private toastr        : ToastrService,
  ) {}

  ngOnInit(): void {
    this.id = this.routeActivated.snapshot.paramMap.get('id');
    const title = this.id ? 'Editar Agente' : 'Configuración Inicial';
    this.navbarService.setTitle(title, 'ecbot/mis-asistentes');

    this.uploadSelects();
    if(this.id) this.getAgent();
  }

  // GETTERS--------------------------------------------------------------------------------

  get isInvalid() {
    return (
      this.isSaving
      || this.isUploading
      || !this.agentForm.companyId
      || !this.agentForm.name
      || !this.agentForm.personalityId
      || !this.agentForm.typeId
    );
  }

  // METHODS--------------------------------------------------------------------------------

  /**
   * Carga los seletores de personalidad y tono
   */
  uploadSelects() {
    this.isUploading = true;

    const obs$ = forkJoin({
      personalities: this.agentService.getAgentPersonalities(),
      types: this.agentService.getAgentTypes(),
      companies: this.companyService.getCompanies()
    });

    obs$.subscribe({
     next: value => {
       this.agentPersonalities = value.personalities;
       this.agentTypes = value.types;
       this.companies = value.companies;
     },
     complete: () => this.isUploading = false
    });
  }


  /**
   * Carga los datos del agente
   */
  async getAgent() {
    try {
      this.isUploading = true;
      const agent$ = this.agentService.getAgentById(this.id as string);
      const agent = await lastValueFrom(agent$);
      this.setAgent(agent);

    } catch (error) {
      this.toastr.error(general.ERROR_MESSAGE);
      this.router.navigate(['ecbot/mis-asistentes']);

    } finally {
      this.isUploading = false;
    }
  }


  /**
   * Inserta o actualiza un agente
   */
    async onSubmit(){
      try {
        this.isSaving = true;

        let resp$ = this.agentService.create(this.agentForm);
        if(this.id) resp$ = this.agentService.update(this.agentForm, this.id);

        const resp = await lastValueFrom(resp$);
        this.toastr.success(resp.message);
        this.router.navigate(['ecbot/mis-asistentes']);

      } catch (error) {
        this.toastr.error(general.ERROR_MESSAGE)

      } finally {
        this.isSaving = false;
      }
    }

    /**
     * Setea los datos del agente
     * @param agent
     */
    setAgent(agent:Agent){
      this.agentForm = {
        additionalInformation: agent.additionalInformation,
        companyId: agent.companyId,
        doNotSay: agent.doNotSay,
        name: agent.name,
        notToTalkAbout: agent.notToTalkAbout,
        personalityId: agent.personalityId,
        stateId: agent.stateId,
        typeId: agent.typeId,
      };
    }

}
