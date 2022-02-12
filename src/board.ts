import { ILetterResult } from './game';

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
    cell.className = 'cell cell--flip-in';
    cell.addEventListener(
      'animationend',
      () => {
        cell.className = `cell cell--flip-out cell--${record.value}`;
        cell.addEventListener(
          'animationend',
          () => {
            cell.classList.remove('cell--flip-out');
          },
          { once: true }
        );
      },
      { once: true }
    );
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
