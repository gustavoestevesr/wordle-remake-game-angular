import { Injectable } from '@angular/core';
import JSConfetti from 'js-confetti';
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

  private timer = '00:00';
  private timeLeft: number = 300; // 5 * 60 = 5 min
  private interval: any;

  private showHowToPlayModal = true
  private showAlertModal = false
  private alertModel = {
    icon: 'alert',
    message: '',
  };

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
    wordInTheCurrentRow =
      wordInTheCurrentRow.charAt(0).toUpperCase() +
      wordInTheCurrentRow.slice(1);
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
      console.error('There is no letters to remove in this row.');
      return;
    }

    this.currentColIndex--;
    this.matrixSlots[this.currentRowIndex][this.currentColIndex].key = '';
  }

  submitWordToValidation() {
    if (this.isRowNotCompletelyFilled()) {
      this.setDataAlertModal(
        'alert',
        'Você precisa preencher todos os campos para submeter uma palavra.',
      );
      this.toggleVisibilityAlertModal(true)
      return console.error(
        'You need to fill all the slots to submit your guess.'
      );
    }

    if (!this.isWordValid()) {
      this.setDataAlertModal(
        'alert',
        'Essa palavra não existe em meu dicionário, tente novamente.',
      );
      this.toggleVisibilityAlertModal(true)
      return console.error(
        'This word does not exist in my dictionary, try another one.'
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
    this.setDataAlertModal(
      'alert',
      'Você perdeu... A palavra secreta era "' + this.secretWord + '"',
    );
    this.toggleVisibilityAlertModal(true)
    console.warn('you lose... The secret word was "' + this.secretWord + '"');
    this.stopGame();
  }

  wonGame() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({ confettiNumber: 300 });

    this.setDataAlertModal(
      'correct',
      'Você acertou a palavra secreta! Parabéns.',
    );
    this.toggleVisibilityAlertModal(true)
    console.warn('You kicked correctly the misterious word! Congratulations.');

    this.stopGame();
  }

  stopGame() {
    this.currentRowIndex = 999;
    this.currentColIndex = 999;
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

  setDataAlertModal(
    icon: string,
    message: string,
  ) {
    this.alertModel = {
      icon,
      message,
    };
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;

        this.timer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        clearInterval(this.interval);
        this.loseGame();
      }
    }, 1000);
  }

  toggleVisibilityHowToPlayModal(showModal: boolean) {
    this.showHowToPlayModal = showModal
  }

  getShowHowToPlayModal() {
    return this.showHowToPlayModal;
  }

  toggleVisibilityAlertModal(showModal: boolean) {
    this.showAlertModal = showModal
  }

  getShowAlertModal() {
    return this.showAlertModal;
  }

  getTimer() {
    return this.timer;
  }

  getDataAlertModal() {
    return this.alertModel;
  }

  // Getters
  getMatrixSlots() {
    return this.matrixSlots;
  }
}
