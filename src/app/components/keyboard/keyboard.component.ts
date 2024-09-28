import { Component, EventEmitter, inject, Output } from '@angular/core';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { CommonModule } from '@angular/common';
import { WordleService } from '../../services/wordle.service';

export interface Slot {
  key: string;
  tip: string;
}

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule, KeyboardButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  private wordleService = inject(WordleService);

  public readonly qwertyAlphabet1: Slot[] = [
    { key: 'Q', tip: 'none' },
    { key: 'W', tip: 'none' },
    { key: 'E', tip: 'none' },
    { key: 'R', tip: 'none' },
    { key: 'T', tip: 'none' },
    { key: 'Y', tip: 'none' },
    { key: 'U', tip: 'none' },
    { key: 'I', tip: 'none' },
    { key: 'O', tip: 'none' },
    { key: 'P', tip: 'none' },
  ];

  public readonly qwertyAlphabet2: Slot[] = [
    { key: 'A', tip: 'none' },
    { key: 'S', tip: 'none' },
    { key: 'D', tip: 'none' },
    { key: 'F', tip: 'none' },
    { key: 'G', tip: 'none' },
    { key: 'H', tip: 'none' },
    { key: 'J', tip: 'none' },
    { key: 'K', tip: 'none' },
    { key: 'L', tip: 'none' },
  ];

  public readonly qwertyAlphabet3: Slot[] = [
    { key: '⏎', tip: 'none' },
    { key: 'Z', tip: 'none' },
    { key: 'X', tip: 'none' },
    { key: 'C', tip: 'none' },
    { key: 'V', tip: 'none' },
    { key: 'B', tip: 'none' },
    { key: 'N', tip: 'none' },
    { key: 'M', tip: 'none' },
    { key: '⌫', tip: 'none' },
  ];

  getLetterClicked(letterSelected: string) {
    if (letterSelected === '⌫') {
      this.wordleService.removeLastLetterFromMatrix();
      return;
    }

    if (letterSelected === '⏎') {
      this.wordleService.submitWordToValidation();
      return;
    }

    // Change the state of letter
    this.wordleService.addLetterIntoMatrix(letterSelected);
  }
}
