import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-select-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss'
})
export class SelectFormComponent {
  @Input() data:any[] = [];
  @Input() name:string = '';
  @Input() title:string = '';

  @Input() model:number | null = null;
  @Output() modelChange: EventEmitter<number | null> = new EventEmitter<number | null>();

  changeSelect(event: any) {
    this.modelChange.emit(this.model);
  }
}
