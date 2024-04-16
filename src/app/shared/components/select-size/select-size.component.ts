import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-size',
  standalone: true,
  imports: [],
  templateUrl: './select-size.component.html',
  styleUrl: './select-size.component.scss'
})
export class SelectSizeComponent {

  @Output() changeSize: EventEmitter<number> = new EventEmitter();

  emitSize(event: any) {
    const size:number = event.target.value;
    this.changeSize.emit(size);
  }

}
