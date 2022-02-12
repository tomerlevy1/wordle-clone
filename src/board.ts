import { wordList1, wordList2 } from './words-list';

enum ELetterValue {
  Correct = 'correct',
  Present = 'present',
  Absent = 'absent',
}

export interface ILetterResult {
  letter: string;
  value: ELetterValue;
}

const board = document.querySelector<HTMLDivElement>('#board')!;
const boardCells: Array<Array<HTMLElement>> = [];

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

const setWord = (rowIndex: number, result: ILetterResult[]) => {
  const row = boardCells[rowIndex];

  result.forEach((record, i) => {
    const cell = row[i];
    cell.textContent = record.letter;
    cell.className = `cell cell--${record.value}`;
  });
};

const deleteLetter = (rowIndex: number, columnIndex: number) => {
  const row = boardCells[rowIndex];
  const cell = row[columnIndex];
  cell.textContent = '';
};

const addLetter = (letter: string, rowIndex: number, columnIndex: number) => {
  const row = boardCells[rowIndex];
  const cell = row[columnIndex];
  cell.textContent = letter;
};

export { initBoard, addLetter, deleteLetter, setWord };
