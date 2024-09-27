import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-keyboard-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-button.component.html',
  styleUrl: './keyboard-button.component.scss',
})
export class KeyboardButtonComponent {
  @Input() letter!: string;
  @Input() tip!: 'correct' | 'almost' | 'none';
  @Output() letterClicked = new EventEmitter<string>();

  onLetterClicked() {
    this.letterClicked.emit(this.letter);
  }

  // @HostListener('window:keydown', ['$event'])
  //  handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log(event.key);
  // }
}
