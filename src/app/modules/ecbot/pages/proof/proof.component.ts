import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

import { AgentList } from '../../interfaces/agents.interface';
import { AgentService } from '../../services/agent.service';
import { ChatProofComponent } from '../../components/chat-proof/chat-proof.component';
import { ContextService } from '../../services/context.service';
import { getSelectFormat } from '../../../../shared/helpers/formated.helper';
import { InputPlaceholderComponent } from '../../../../shared/components/input-placeholder/input-placeholder.component';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { Select } from '../../../../shared/interfaces/select.interface';
import { SelectFormComponent } from '../../../../shared/components/select-form/select-form.component';
import { ExampleProofComponent } from '../../components/example-proof/example-proof.component';

@Component({
  selector: 'app-proof',
  standalone: true,
  imports: [
    ChatProofComponent,
    CommonModule,
    ExampleProofComponent,
    FormsModule,
    InputPlaceholderComponent,
    LabelComponent,
    NgSelectModule,
    SelectFormComponent
  ],
  templateUrl: './proof.component.html',
  styleUrl: './proof.component.scss',
})
export class ProofComponent {

  @ViewChild(ExampleProofComponent) example!: ExampleProofComponent;

  isUploading: boolean = false;
  isUpContext: boolean = false;

  agents: AgentList[] = [];
  agentTypes: Select[] = [];

  agentId: number | null = null;
  typeId: number | null = null;
  context: string = '';
  contextTemp: string = '';

  constructor(
    private navbarService : NavbarService,
    private agentService  : AgentService,
    private contextService: ContextService,
    private toastr        : ToastrService,
  ) {}

  ngOnInit(): void {
    this.navbarService.setTitle('Prueba', 'ecbot/mis-asistentes');

    this.uploadSelects();
  }

  // METHODS--------------------------------------------------------------------------------

  /**
   * Carga los seletores de agente y tipo
   */
  uploadSelects() {
    this.isUploading = true;

    const obs$ = forkJoin({
      agents: this.agentService.getAgents(),
      types: this.agentService.getAgentTypes(),
    });

    obs$.subscribe({
      next: (value) => {
        this.agents = value.agents;
        this.agentTypes = getSelectFormat(value.types, 'type');
      },
      complete: () => this.isUploading = false,
    });
  }


  /**
   * Cambia el agente seleccionado
   * @param event
   */
  async changeAgent(){
    this.context = '';
    this.example.getExamples(this.agentId);
    if(!this.agentId) return;

    try {
      this.isUpContext = true;
      const resp$ = this.contextService.getContextByAgentId(this.agentId);
      const resp = await lastValueFrom(resp$);
      this.context = resp.context;
      this.contextTemp = resp.context;

    } catch (error) {
      this.toastr.error('Ocurrió un error al obtener el contexto del agente');

    } finally {
      this.isUpContext = false;
    }
  }


  /**
   * Cambia el tipo seleccionado
   * @param event
   */
  async changeContext() {
    try {
      if(this.context === this.contextTemp) return;

      if(!this.context || !this.agentId){
        throw new Error('El contexto no puede estar vacío');
      }

      this.isUpContext = true;
      const resp$ = this.contextService.updateContextByAgentId(this.agentId, this.context);
      const resp = await lastValueFrom(resp$);
      this.toastr.success('Contexto actualizado con éxito');
      this.contextTemp = this.context;

    } catch (error:any) {
      this.toastr.error(error.message);
      this.context = this.contextTemp;

    } finally {
      this.isUpContext = false;
    }
  }




}
