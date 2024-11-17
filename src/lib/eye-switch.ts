class EyeSwitch {
  constructor(options = {}) {
    this.options = {
      toggleMode: 'focus',
      keyCombo: this.getDefaultKeyCombo(),
      ...options
    };
    this.state = {
      isVisible: false,
      focusedFieldId: null
    };
    this.eventListeners = {};
  }

  getDefaultKeyCombo() {
    if (typeof window !== 'undefined') {
      return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform) ? 'Cmd+8' : 'Ctrl+8'
    }
    return 'Ctrl+8' // Default for server-side rendering
  }

  setToggleMode(mode) {
    if (mode === 'focus' || mode === 'all') {
      this.options.toggleMode = mode;
      this.emit('modeChanged', mode);
    }
  }

  setKeyCombo(keyCombo) {
    this.options.keyCombo = keyCombo;
    this.emit('keyComboChanged', keyCombo);
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey;
    const cmd = event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    if (
      (this.options.keyCombo === 'Ctrl+8' && ctrl && key === '8') ||
      (this.options.keyCombo === 'Cmd+8' && cmd && key === '8') ||
      (this.options.keyCombo === 'Ctrl+Shift+L' && ctrl && shift && key === 'l') ||
      (this.options.keyCombo === 'Alt+P' && alt && key === 'p')
    ) {
      event.preventDefault();
      this.toggle();
    }
  }

  setFocusedField(fieldId) {
    this.state.focusedFieldId = fieldId;
  }

  toggle() {
    if (this.options.toggleMode === 'focus' && !this.state.focusedFieldId) {
      return;
    }

    this.state.isVisible = !this.state.isVisible;
    this.emit('visibilityChanged', {
      isVisible: this.state.isVisible,
      affectedFields: this.options.toggleMode === 'all' ? 'all' : this.state.focusedFieldId
    });
  }

  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(cb => cb !== callback);
    }
  }

  emit(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(callback => callback(data));
    }
  }
}

export default EyeSwitch;
