import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../models/Page.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() page:Page = new Page();
  @Output() changePage: EventEmitter<number> = new EventEmitter();


  pageChange(event: number) {
    this.changePage.emit(event);
  }

}
