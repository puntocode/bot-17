import { AgentService } from './../../services/agent.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Page } from '../../../../shared/models/Page.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SelectSizeComponent } from '../../../../shared/components/select-size/select-size.component';
import { TableBtnDeleteComponent } from '../../../../shared/components/table-btn-delete/table-btn-delete.component';
import { Agent } from '../../interfaces/agents.interface';

@Component({
  selector: 'app-table-assistants',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    RouterModule,
    SelectSizeComponent,
    TableBtnDeleteComponent
  ],
  templateUrl: './table-assistants.component.html',
  styleUrl: './table-assistants.component.scss'
})
export class TableAssistantsComponent {

  isLoaded = false;
  agents: Agent[] = [];
  page = new Page();

  data = {
    searchWords: '',
    page       : '1',
    limit      : '15',
  }


  constructor(
    private agentService: AgentService,
    private toastr:           ToastrService
  ) { }

  ngOnInit(): void {
    this.getAssistants();
  }


  // METHODS--------------------------------------------------------------------------------

  async getAssistants(page = 1){
    try {
      this.isLoaded = true;
      this.agents = [];

      this.page.current = page;
      this.data.page = page.toString();
      this.data.limit = this.page.size.toString();

      const resp$ = this.agentService.getPaginatedAgents(this.data);
      const resp = await lastValueFrom(resp$);
      this.agents = resp.data;
      this.page.total = resp.total;

    } catch (error) {
      this.toastr.error('No se han podido obtener los agentes');

    } finally {
      this.isLoaded = false;
    }
  }

  changeSize(size: number){
    this.page.size = size;
    this.getAssistants();
  }

  /**
   * Borrado lógico de un agente
   * @param agent
   */
  deleteAssistants(agent: Agent){
    this.agentService.delete(agent.id ?? 0).subscribe({
      next: (resp) => {
        this.getAssistants();
        this.toastr.success(resp.message);
      },
      error: () => {
        this.toastr.error('No se ha podido eliminar el agente, intentalo de nuevo');
        agent.isDeleting = false;
      }
    })

  }

}
