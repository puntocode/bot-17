import { Component } from '@angular/core';
import { Page } from '../../../../shared/models/Page.model';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { SelectSizeComponent } from '../../../../shared/components/select-size/select-size.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { TableBtnDeleteComponent } from '../../../../shared/components/table-btn-delete/table-btn-delete.component';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    LoaderComponent,
    PaginationComponent,
    RouterModule,
    SelectSizeComponent,
    TableBtnDeleteComponent
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent {

  isLoaded = false;
  users: any[] = [];
  page = new Page()

  data = {
    searchWords: '',
    page       : '1',
    limit      : '15',
  }

  constructor(
    private userService: UserService,
    private toastr     : ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //METHODS---------------------------------------------------------------------------------

  /**
   * Obtiene la lista de usuarios
   * @param page number
   */
  async getUsers(page = 1){
    try {
      this.isLoaded = true;
      this.users = [];

      this.page.current = page;
      this.data.page = page.toString();
      this.data.limit = this.page.size.toString();

      this.users = this.userService.getPaginatedUsers();
      this.page.total = this.users.length;

      // const resp$ = this.userService.getPaginatedUser(this.data);
      // const resp = await lastValueFrom(resp$);
      // this.users = resp.data;
      // this.page.total = resp.total;

    } catch (error) {
      this.toastr.error('No se han podido obtener los usuarios');

    } finally {
      this.isLoaded = false;
    }
  }


  /**
   * Cuanto cambia el tamaño de la página
   */
  changeSize(size: number) {
    this.page.size = size;
    this.getUsers();
  }


  /**
   * Elimina un usuario
   * @param row user
   */
  deleteUser(row: any){
    console.log(row);
    // this.integrationService.delete(row.id).subscribe({
    //   next: () => {
    //     this.getIntegrations();
    //     this.toastr.success('La integración se ha eliminado correctamente');
    //   },
    //   error: () => {
    //     this.toastr.error('No se ha podido eliminar la integración, intentalo de nuevo');
    //     row.isDeleting = false;
    //   }
    // })
  }


}
