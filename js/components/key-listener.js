import { KeyUtils } from '../utils/key-utils.js';
import { SPECIAL_KEYS } from '../constants/key-codes.js';
import { PanicManager } from '../utils/panic-utils.js';

export class KeyListener {
  constructor(inputElement, displayElement) {
    this.inputElement = inputElement;
    this.displayElement = displayElement;
    this.currentKeys = new Set();
    this.isRecording = false;
    
    this.setupListeners();
    this.loadSavedCombo();
  }

  setupListeners() {
    // Key recording for the input field
    this.inputElement.addEventListener('focus', () => {
      this.isRecording = true;
      this.currentKeys.clear();
      this.displayElement.textContent = 'Press your key combination...';
    });

    this.inputElement.addEventListener('blur', () => {
      this.isRecording = false;
      if (this.currentKeys.size > 0) {
        const sortedKeys = KeyUtils.sortKeys(Array.from(this.currentKeys));
        PanicManager.setPanicKeyCombo(sortedKeys);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.isRecording) {
        e.preventDefault();
        
        const key = e.key;
        this.currentKeys.add(key);
        
        const sortedKeys = KeyUtils.sortKeys(Array.from(this.currentKeys));
        this.displayElement.textContent = KeyUtils.formatKeyCombo(sortedKeys);
      }
    });

    // Global key combination listener
    document.addEventListener('keydown', (e) => {
      const savedCombo = PanicManager.getPanicKeyCombo();
      if (savedCombo.length === 0) return;

      const pressedKeys = new Set();
      if (e.ctrlKey) pressedKeys.add(SPECIAL_KEYS.CTRL);
      if (e.altKey) pressedKeys.add(SPECIAL_KEYS.ALT);
      if (e.shiftKey) pressedKeys.add(SPECIAL_KEYS.SHIFT);
      pressedKeys.add(e.key);

      const pressedKeysArray = KeyUtils.sortKeys(Array.from(pressedKeys));
      const savedComboSorted = KeyUtils.sortKeys(savedCombo);

      if (pressedKeysArray.length === savedComboSorted.length &&
          pressedKeysArray.every((key, i) => key === savedComboSorted[i])) {
        e.preventDefault();
        PanicManager.executePanic();
      }
    });
  }

  loadSavedCombo() {
    const savedCombo = PanicManager.getPanicKeyCombo();
    if (savedCombo.length > 0) {
      this.displayElement.textContent = KeyUtils.formatKeyCombo(savedCombo);
    }
  }
}