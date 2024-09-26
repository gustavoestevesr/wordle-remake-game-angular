import { Component, EventEmitter, Output } from '@angular/core';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule, KeyboardButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  @Output() letterSelected = new EventEmitter<string>();

  public readonly qwertyAlphabet = [
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
    { label: 'A', disabled: false },
    { label: 'S', disabled: false },
    { label: 'D', disabled: false },
    { label: 'F', disabled: false },
    { label: 'G', disabled: false },
    { label: 'H', disabled: false },
    { label: 'J', disabled: false },
    { label: 'K', disabled: false },
    { label: 'L', disabled: false },
    { label: 'Z', disabled: false },
    { label: 'X', disabled: false },
    { label: 'C', disabled: false },
    { label: 'DEL', disabled: false },
    { label: 'V', disabled: false },
    { label: 'B', disabled: false },
    { label: 'N', disabled: false },
    { label: 'M', disabled: false },
    { label: 'ENTER', disabled: false },
  ];

  buttonClicked(letterSelected: string) {
    // Send the letter to the parent (main code)
    this.letterSelected.emit(letterSelected);

    // Return nothing if it was pressed ENTER OR DELETE
    if (letterSelected === 'ENTER' || letterSelected === 'DEL') return;

    // Find the letter in qwertyAlphabet
    const letterIndex = this.qwertyAlphabet.findIndex(
      (letter) => letter.label === letterSelected
    );

    // Return nothing if it doesn't find
    if (letterIndex === -1) return;

    // Change the state of disabled
    this.qwertyAlphabet[letterIndex].disabled = true;
  }
}
