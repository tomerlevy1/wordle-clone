import { addLetter, applyAttempt, deleteLetter, initBoard, isGameOver } from './board';
import './style.scss';
import { initUserInput } from './user-input';

let finished = false;
const enterCallback = () => {
  if (finished) return;

  applyAttempt();
  finished = isGameOver();
};

const deleteCallback = () => {
  if (finished) return;
  deleteLetter();
};

const inputCallback = (letter: string) => {
  if (finished) return;
  addLetter(letter);
};

initBoard();
initUserInput(inputCallback, deleteCallback, enterCallback);
