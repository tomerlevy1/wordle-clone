import './style.scss';

const board = document.querySelector<HTMLDivElement>('#board')!;

const createCellElement = () => {
  const cell = document.createElement('div');
  cell.className = 'cell cell--empty';
  return cell;
};

const initBoard = () => {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = createCellElement();
      board.appendChild(cell);
    }
  }
};

initBoard();
