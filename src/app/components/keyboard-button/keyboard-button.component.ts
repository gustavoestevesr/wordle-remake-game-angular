import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-button.component.html',
  styleUrl: './keyboard-button.component.scss'
})
export class KeyboardButtonComponent {
  @Input() letter!: string;
  @Input() disabled!: boolean;
  @Input() tip!: 'correct' | 'almost';
  @Output() buttonClicked = new EventEmitter<string>();

  onButtonClick() {
    if (!this.disabled) {
      this.buttonClicked.emit(this.letter);
    }
  }
}
