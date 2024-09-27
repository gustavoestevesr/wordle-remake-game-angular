import { Injectable } from '@angular/core';
import { Slot } from '../components/keyboard/keyboard.component';
import { FIVE_LETTERS_WORD } from '../constants/five-letters-word';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  private secretWord!: string;
  private difficultLevel = 5;
  private readonly MAX_TRIES = 6;
  private matrixSlots: Slot[][] = [];
  private currentRowIndex = 0;
  private currentColIndex = 0;

  constructor() {
    this.setSecretWord(this.difficultLevel);
    this.drawMatrix();
  }

  setSecretWord(difficultLevel: number) {
    const randomIndex = Math.floor(Math.random() * FIVE_LETTERS_WORD.length);
    this.secretWord = FIVE_LETTERS_WORD[randomIndex].toUpperCase();
    console.log(this.secretWord);
    // if (difficultLevel === 3) {
    //   this.secretWord = this.FIVE_LETTERS_WORD[randomIndex]
    // } else if (difficultLevel === 4) {
    //   this.secretWord = this.FIVE_LETTERS_WORD[randomIndex]
    // } else if (difficultLevel === 5) {
    //   this.secretWord = this.FIVE_LETTERS_WORD[randomIndex]
    // } else if (difficultLevel === 6) {
    //   this.secretWord = this.FIVE_LETTERS_WORD[randomIndex]
    // }
  }

  setTipsInTheRowOfTheMatrix() {
    const secretWordArray = this.secretWord.split('');
    const row = this.matrixSlots[this.currentRowIndex];

    // Couting the letters in the secret word
    // Strategy to not repeat de tips for the same letter
    // ex: CELLS and CCCEL
    let qtdLettersInSecretWord = new Map<string, number>();
    for (const letter of this.secretWord) {
      qtdLettersInSecretWord.set(
        letter,
        (qtdLettersInSecretWord.get(letter) ?? 0) + 1
      );
    }

    for (let i = 0; i < this.difficultLevel; i++) {
      const userAchivedPositionAndLetter = row[i].key === secretWordArray[i];
      const userAchivedOnlyLetter = this.secretWord.includes(row[i].key);
      const hasLettersToGiveTip = qtdLettersInSecretWord.get(row[i].key)! > 0;

      if (userAchivedPositionAndLetter && hasLettersToGiveTip) {
        row[i].tip = 'correct animated';
        qtdLettersInSecretWord.set(
          row[i].key,
          qtdLettersInSecretWord.get(row[i].key)! - 1
        );
      } else if (userAchivedOnlyLetter && hasLettersToGiveTip) {
        row[i].tip = 'almost animated';
        qtdLettersInSecretWord.set(
          row[i].key,
          qtdLettersInSecretWord.get(row[i].key)! - 1
        );
      } else {
        row[i].tip = 'wrong animated';
      }
    }
  }

  isRowNotCompletelyFilled(): boolean {
    return this.currentColIndex !== this.difficultLevel;
  }

  isWordValid(): boolean {
    const row = this.matrixSlots[this.currentRowIndex];
    let wordInTheCurrentRow = row
      .map((slot) => slot.key)
      .join('')
      .toLowerCase();
    wordInTheCurrentRow = wordInTheCurrentRow.charAt(0).toUpperCase() + wordInTheCurrentRow.slice(1);
    return FIVE_LETTERS_WORD.includes(wordInTheCurrentRow);
  }

  isWordEqualsSecretWord(): boolean {
    const row = this.matrixSlots[this.currentRowIndex];
    const wordInTheCurrentRow = row
      .map((slot) => slot.key)
      .join('')
      .toLowerCase();
    return wordInTheCurrentRow === this.secretWord;
  }

  addLetterIntoMatrix(letterSelected: string) {
    const hasNotFreeSlotsInTheRow = this.currentColIndex >= this.difficultLevel;
    if (hasNotFreeSlotsInTheRow) {
      console.error('there is no space enough to add letters in this row');
      return;
    }

    this.matrixSlots[this.currentRowIndex][this.currentColIndex].key =
      letterSelected;
    this.currentColIndex++;
  }

  removeLastLetterFromMatrix() {
    const hasNotLettersInTheRow = this.currentColIndex <= 0;
    if (hasNotLettersInTheRow) {
      console.error('there is no letters to remove in this row');
      return;
    }

    this.currentColIndex--;
    this.matrixSlots[this.currentRowIndex][this.currentColIndex].key = '';
  }

  submitWordToValidation() {
    if (this.isRowNotCompletelyFilled()) {
      return console.error(
        'you need to fill all the slots to submit your guess'
      );
    }

    if (!this.isWordValid()) {
      return console.error(
        'this word does not exist in my dictionary, try another one'
      );
    }

    if (this.isWordEqualsSecretWord()) {
      this.wonGame();
      return;
    }

    this.setTipsInTheRowOfTheMatrix();
    this.newTrie();
  }

  loseGame() {
    console.warn('you lose');
  }

  wonGame() {
    console.warn('you won');
  }

  newTrie() {
    if (this.currentRowIndex >= this.MAX_TRIES - 1) {
      this.loseGame();
    }
    this.currentRowIndex++;
    this.currentColIndex = 0;
  }

  drawMatrix() {
    for (let i = 0; i < this.MAX_TRIES; i++) {
      const row: Slot[] = [];
      for (let j = 0; j < this.difficultLevel; j++) {
        row.push({ key: '', tip: 'none' });
      }
      this.matrixSlots.push(row);
    }
  }

  // Getters

  getDifficultLevel() {
    return this.difficultLevel;
  }

  // getTries() {
  //   return this.tries;
  // }

  getMatrixSlots() {
    return this.matrixSlots;
  }

  getSecretWord(): string {
    return this.secretWord;
  }
}
