import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './input-placeholder.component.html',
  styleUrl: './input-placeholder.component.scss'
})
export class InputPlaceholderComponent {

  @Input() isInput: boolean = true;

}
