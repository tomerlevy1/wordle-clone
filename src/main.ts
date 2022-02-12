import { addLetter, applyAttempt, deleteLetter, initBoard, isGameOver } from './board';
import { initKeyboard, updateKeys } from './keyboard';
import './style.scss';
import { initUserInput } from './user-input';

let finished = false;
const enterCallback = () => {
  if (finished) return;

  const lettersResults = applyAttempt()!;
  updateKeys(lettersResults);

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
initKeyboard();
initUserInput(inputCallback, deleteCallback, enterCallback);
