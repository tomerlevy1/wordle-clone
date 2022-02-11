import { wordList1, wordList2 } from './words-list';

const board = document.querySelector<HTMLDivElement>('#board')!;

const boardCells: Array<Array<HTMLElement>> = [];
const attempts = [];
let secret: string | null = null;
let currentAttempt: string[] = [];
let foundSecret = false;

const getSecretWord = () => {
  const allWords = [wordList1, wordList2];
  const wordList = Math.floor(Math.random() * 2);
  const list = allWords[wordList];
  const wordIndex = Math.floor(Math.random() * list.length);
  console.log(list[wordIndex]);

  return list[wordIndex];
};

const createCellElement = () => {
  const cell = document.createElement('div');
  cell.className = 'cell cell--empty';
  return cell;
};

const initBoard = () => {
  secret = getSecretWord();
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      const cell = createCellElement();
      board.appendChild(cell);
      row.push(cell);
    }
    boardCells.push(row);
  }
};

enum ELetterValue {
  Correct = 'correct',
  Present = 'present',
  Absent = 'absent',
}

interface ILetterResult {
  letter: string;
  value: ELetterValue;
}

const calculateLetterValue = (letter: string, index: number) => {
  if (secret) {
    if (secret.charAt(index) === letter) {
      return ELetterValue.Correct;
    } else if (secret.includes(letter)) {
      return ELetterValue.Present;
    }
  }

  return ELetterValue.Absent;
};

const calculateResult = (): ILetterResult[] => {
  return currentAttempt.map((letter, i) => {
    return {
      letter,
      value: calculateLetterValue(letter, i),
    };
  });
};

const setWord = (rowIndex: number, result: ILetterResult[]) => {
  const row = boardCells[rowIndex];

  result.forEach((record, i) => {
    const cell = row[i];
    cell.textContent = record.letter;
    cell.className = `cell cell--${record.value}`;
  });
};

const deleteLetter = () => {
  const row = boardCells[attempts.length];
  const cell = row[currentAttempt.length - 1];
  cell.textContent = '';
  currentAttempt.pop();
};

const applyAttempt = () => {
  if (currentAttempt.length < 5) return;

  attempts.push(currentAttempt.join(''));
  const result = calculateResult();
  setWord(attempts.length - 1, result);

  if (result.every((record) => record.value === ELetterValue.Correct)) {
    foundSecret = true;
  }

  currentAttempt.length = 0;
};

const addLetter = (letter: string) => {
  if (currentAttempt.length > 4) return;

  const row = boardCells[attempts.length];
  const cell = row[currentAttempt.length];
  cell.textContent = letter;
  currentAttempt.push(letter);
};

const isGameOver = () => {
  return attempts.length === 5 || foundSecret;
};

export { initBoard, applyAttempt, addLetter, deleteLetter, isGameOver };
