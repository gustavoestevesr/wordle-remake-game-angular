import { Component, EventEmitter, inject, Output } from '@angular/core';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { CommonModule } from '@angular/common';
import { WordleService } from '../../services/wordle.service';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule, KeyboardButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  private wordleService = inject(WordleService);

  public readonly qwertyAlphabet1 = [
    { label: 'Q', disabled: false },
    { label: 'W', disabled: false },
    { label: 'E', disabled: false },
    { label: 'R', disabled: false },
    { label: 'T', disabled: false },
    { label: 'Y', disabled: false },
    { label: 'U', disabled: false },
    { label: 'I', disabled: false },
    { label: 'O', disabled: false },
    { label: 'P', disabled: false },
  ];

  public readonly qwertyAlphabet2 = [
    { label: 'A', disabled: false },
    { label: 'S', disabled: false },
    { label: 'D', disabled: false },
    { label: 'F', disabled: false },
    { label: 'G', disabled: false },
    { label: 'H', disabled: false },
    { label: 'J', disabled: false },
    { label: 'K', disabled: false },
    { label: 'L', disabled: false },
  ];

  public readonly qwertyAlphabet3 = [
    { label: 'DEL', disabled: false },
    { label: 'Z', disabled: false },
    { label: 'X', disabled: false },
    { label: 'C', disabled: false },
    { label: 'V', disabled: false },
    { label: 'B', disabled: false },
    { label: 'N', disabled: false },
    { label: 'M', disabled: false },
    { label: 'ENTER', disabled: false },
  ];

  buttonClicked(letterSelected: string) {
    if (letterSelected === 'DEL') {
      this.wordleService.removeLastLetterKickedFromUser();
      return;
    }

    if (letterSelected === 'ENTER') {
      if (
        this.wordleService.isWordValid() &&
        !this.wordleService.isWordEqualsSecretWord()
      ) {
        this.wordleService.submitWordKicked();
        return;
      }
    }

    // Change the state of letter to disabled true
    // if (this.wordleService.canDisableTheSlot()) {
    //   this.wordleService.addLettersKickedFromUser(letterSelected);
    //   const letterIndex = this.qwertyAlphabet.findIndex(
    //     (letter) => letter.label === letterSelected
    //   );

    //   if (letterIndex === -1) return;

    //   this.qwertyAlphabet[letterIndex].disabled = true;
    // }
  }
}
