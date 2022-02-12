import { ILetterResult } from './board';

const keyboard = document.querySelector<HTMLDivElement>('#keyboard')!;
const keysRef = {};

const SPECIAL_KEYS: { [key: string]: string } = {
  enter: '&#9166',
  backspace: '&#9003',
};

const templateKey = (value: string) => {
  const isSpecialKey = value.length > 1;
  const textValue = !isSpecialKey ? value : SPECIAL_KEYS[value];
  return `<div class="kb__key${isSpecialKey ? ' kb__key--big' : ''}" data-key="${value}">${textValue}</div>`;
};

const addKeysRow = (keys: string[]) => {
  const container = document.createElement('div');
  container.className = 'kb__row';
  container.innerHTML = keys.map(templateKey).join('');

  keyboard.appendChild(container);
};

const initKeyboard = () => {
  addKeysRow('qwertyuiop'.split(''));
  addKeysRow('asdfghjkl'.split(''));
  addKeysRow(['enter', ...'zxcvbnm'.split(''), 'backspace']);
};

const updateKeys = (lettersResults: ILetterResult[]) => {
  lettersResults.forEach((result) => {
    const keyEl = keyboard.querySelector(`[data-key="${result.letter}"]`);
    keyEl?.classList.add(`kb__key--${result.value}`);
  });
};

export { initKeyboard, updateKeys };