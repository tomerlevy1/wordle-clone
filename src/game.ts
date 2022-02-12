import { addLetter, deleteLetter, initBoard, setWord } from './board';
import { initKeyboard, updateKeys } from './keyboard';
import { initUserInput } from './user-input';
import { wordList1, wordList2 } from './words-list';

interface IState {
  hasEnded: boolean;
  secretWord: string;
  currentAttempt: string[];
  attempts: string[];
}

enum ELetterValue {
  Correct = 'correct',
  Present = 'present',
  Absent = 'absent',
}

export interface ILetterResult {
  letter: string;
  value: ELetterValue;
}

export default class Game {
  private state: IState;

  constructor() {
    this.state = {
      hasEnded: false,
      secretWord: this.getSecretWord(),
      currentAttempt: [],
      attempts: [],
    };
  }

  init() {
    this.state = {
      ...this.state,
      currentAttempt: [],
    };

    const enterCallback = () => {
      if (this.state.hasEnded) return;

      const lettersResults = this.applyAttempt()!;
      updateKeys(lettersResults);
    };

    const deleteCallback = () => {
      if (this.state.hasEnded) return;
      this.deleteLetter();
    };

    const inputCallback = (letter: string) => {
      if (this.state.hasEnded) return;
      this.addLetter(letter);
    };

    initBoard();
    initKeyboard();
    initUserInput(inputCallback, deleteCallback, enterCallback);
    console.log(this.state);
  }

  getSecretWord() {
    const allWords = [wordList1, wordList2];
    const wordList = Math.floor(Math.random() * 2);
    const list = allWords[wordList];
    const wordIndex = Math.floor(Math.random() * list.length);
    return list[wordIndex];
  }

  calculateLetterValue(letter: string, index: number) {
    const { secretWord } = this.state;

    if (secretWord.charAt(index) === letter) {
      return ELetterValue.Correct;
    } else if (secretWord.includes(letter)) {
      return ELetterValue.Present;
    }

    return ELetterValue.Absent;
  }

  isValidWord() {
    const { currentAttempt } = this.state;
    const word = currentAttempt.join('');
    return wordList1.includes(word) || wordList2.includes(word);
  }

  calculateResult(): ILetterResult[] {
    const { currentAttempt } = this.state;
    return currentAttempt.map((letter, i) => {
      return {
        letter,
        value: this.calculateLetterValue(letter, i),
      };
    });
  }

  applyAttempt() {
    const { currentAttempt } = this.state;
    if (currentAttempt.length < 5) return;

    if (!this.isValidWord()) {
      return [];
    }

    this.state.attempts.push(currentAttempt.join(''));
    const result = this.calculateResult();
    setWord(this.state.attempts.length - 1, result);

    if (result.every((record) => record.value === ELetterValue.Correct)) {
      this.state.hasEnded = true; // win - correct word
    }

    if (this.state.attempts.length === 6) {
      this.state.hasEnded = true; // lost - used all attempts
    }

    currentAttempt.length = 0;
    return result;
  }

  deleteLetter() {
    this.state.currentAttempt.pop();
    deleteLetter(this.state.attempts.length, this.state.currentAttempt.length);
  }

  addLetter(letter: string) {
    const { currentAttempt } = this.state;
    if (currentAttempt.length > 4) return;
    this.state.currentAttempt.push(letter);
    addLetter(letter, this.state.attempts.length, this.state.currentAttempt.length - 1);
  }
}
