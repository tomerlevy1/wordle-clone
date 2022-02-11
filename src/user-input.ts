type InputCallback = (char: string) => void;
type ActionCallback = () => void;

const initUserInput = (inputCallback: InputCallback, deleteCallback: ActionCallback, enterCallback: ActionCallback) => {
  document.addEventListener('keydown', (e) => {
    const { key, code } = e;

    if (/^(Key[A-Z])$/.test(code)) {
      inputCallback(key.toLowerCase());
    } else if (code === 'Enter') {
      enterCallback();
    } else if (code === 'Backspace') {
      deleteCallback();
    }
  });
};

export { initUserInput };
