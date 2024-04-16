import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {

  searchWork: string = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  search(){
    this.onSearch.emit(this.searchWork);
  }

}

