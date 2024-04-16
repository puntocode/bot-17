import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { getDeleteOption } from '../../helpers/alert.helper';
import { general } from '../../constant/general.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-btn-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-btn-delete.component.html',
  styleUrl: './table-btn-delete.component.scss'
})
export class TableBtnDeleteComponent {

  @Input() row:any = {};
  @Output() emitDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  async deleteRow(row:any){
    const option = getDeleteOption(general.DELETE_MSG);
    const swal$ = from(Swal.fire(option));
    const confirmed = await lastValueFrom(swal$);

    if(confirmed.isConfirmed){
      row.isDeleting = true;
      this.emitDelete.emit(row);
    }
  }

}
