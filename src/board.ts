const board = document.querySelector<HTMLDivElement>('#board')!;

const boardCells: Array<Array<HTMLElement>> = [];
const attempts = [];
const secret = 'morts';

const createCellElement = () => {
  const cell = document.createElement('div');
  cell.className = 'cell cell--empty';
  return cell;
};

const initBoard = () => {
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
  if (secret.charAt(index) === letter) {
    return ELetterValue.Correct;
  } else if (secret.includes(letter)) {
    return ELetterValue.Present;
  }

  return ELetterValue.Absent;
};

const calculateResult = (word: string): ILetterResult[] => {
  const letters = word.split('');

  return letters.map((letter, i) => {
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

const addAttempt = (word: string) => {
  attempts.push(word);

  const result = calculateResult(word);
  setWord(attempts.length - 1, result);
};

export { initBoard, addAttempt, setWord };
