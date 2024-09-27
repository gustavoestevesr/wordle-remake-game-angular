import { Component, EventEmitter, inject, Output } from '@angular/core';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { CommonModule } from '@angular/common';
import { WordleService } from '../../services/wordle.service';

export interface Slot {
  key: string;
  tip: string;
  disabled: boolean;
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
    { key: 'Q', tip: 'none', disabled: false },
    { key: 'W', tip: 'none', disabled: false },
    { key: 'E', tip: 'none', disabled: false },
    { key: 'R', tip: 'none', disabled: false },
    { key: 'T', tip: 'none', disabled: false },
    { key: 'Y', tip: 'none', disabled: false },
    { key: 'U', tip: 'none', disabled: false },
    { key: 'I', tip: 'none', disabled: false },
    { key: 'O', tip: 'none', disabled: false },
    { key: 'P', tip: 'none', disabled: false },
  ];

  public readonly qwertyAlphabet2: Slot[] = [
    { key: 'A', tip: 'none', disabled: false },
    { key: 'S', tip: 'none', disabled: false },
    { key: 'D', tip: 'none', disabled: false },
    { key: 'F', tip: 'none', disabled: false },
    { key: 'G', tip: 'none', disabled: false },
    { key: 'H', tip: 'none', disabled: false },
    { key: 'J', tip: 'none', disabled: false },
    { key: 'K', tip: 'none', disabled: false },
    { key: 'L', tip: 'none', disabled: false },
  ];

  public readonly qwertyAlphabet3: Slot[] = [
    { key: 'DEL', tip: 'none', disabled: false },
    { key: 'Z', tip: 'none', disabled: false },
    { key: 'X', tip: 'none', disabled: false },
    { key: 'C', tip: 'none', disabled: false },
    { key: 'V', tip: 'none', disabled: false },
    { key: 'B', tip: 'none', disabled: false },
    { key: 'N', tip: 'none', disabled: false },
    { key: 'M', tip: 'none', disabled: false },
    { key: 'ENTER', tip: 'none', disabled: false },
  ];

  getLetterClicked(letterSelected: string) {
    if (letterSelected === 'DEL') {
      this.wordleService.removeLastLetterFromMatrix();
      return;
    }

    if (letterSelected === 'ENTER') {
      this.wordleService.submitWordToValidation();
      return;
    }

    // Change the state of letter
    this.wordleService.addLetterIntoMatrix(letterSelected);
  }

  private disableLetterButton() {
    // const letterIndex = this.qwertyAlphabet.findIndex(
    //   (letter) => letter.key === letterSelected
    // );
    // if (letterIndex === -1) return;
    // this.qwertyAlphabet[letterIndex].disabled = true;
  }
}
