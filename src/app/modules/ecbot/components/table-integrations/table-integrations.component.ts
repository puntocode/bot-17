import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Integration } from '../../interfaces/integrations.interface';
import { IntegrationService } from '../../services/integration.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Page } from '../../../../shared/models/Page.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SelectSizeComponent } from '../../../../shared/components/select-size/select-size.component';
import { TableBtnDeleteComponent } from '../../../../shared/components/table-btn-delete/table-btn-delete.component';

@Component({
  selector: 'app-table-integrations',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    RouterModule,
    SelectSizeComponent,
    TableBtnDeleteComponent
  ],
  templateUrl: './table-integrations.component.html',
  styleUrl: './table-integrations.component.scss'
})
export class TableIntegrationsComponent {

  @Output() emitIntegration: EventEmitter<Integration> = new EventEmitter();

  isLoaded = false;
  integrations: Integration[] = [];
  page = new Page()

  data = {
    searchWords: '',
    page       : '1',
    limit      : '15',
  }

  constructor(
    private integrationService: IntegrationService,
    private toastr            : ToastrService
  ) { }

  ngOnInit(): void {
    this.getIntegrations();
  }


  // METHODS--------------------------------------------------------------------------------

  async getIntegrations(page = 1){
    try {
      this.isLoaded = true;
      this.integrations = [];

      this.page.current = page;
      this.data.page = page.toString();
      this.data.limit = this.page.size.toString();

      const resp$ = this.integrationService.getPaginatedIntegrations(this.data);
      const resp = await lastValueFrom(resp$);
      this.integrations = resp.data;
      this.page.total = resp.total;


    } catch (error) {
      this.toastr.error('No se han podido obtener las integraciones');

    } finally {
      this.isLoaded = false;
    }
  }

  changeSize(size: number){
    this.page.size = size;
    this.getIntegrations();
  }

  /**
   * Edita una integración
   * @param row Integración
   */
  editIntegration(row: Integration){
    this.emitIntegration.emit(row);
  }

  /**
   * Elimina una Integracion
   * @param row Integracion
   */
  deleteIntegrations(row: Integration){
    this.integrationService.delete(row.id ?? 0).subscribe({
      next: () => {
        this.getIntegrations();
        this.toastr.success('La integración se ha eliminado correctamente');
      },
      error: () => {
        this.toastr.error('No se ha podido eliminar la integración, intentalo de nuevo');
        row.isDeleting = false;
      }
    })
  }

}
