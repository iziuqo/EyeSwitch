interface EyeSwitchOptions {
  toggleMode?: 'focus' | 'all';
  keyCombo?: string;
  onToggle?: () => void;
}

interface EyeSwitchState {
  isVisible: boolean;
  focusedFieldId: string | null;
}

interface VisibilityChangeEvent {
  isVisible: boolean;
  affectedFields: 'all' | string;
}

type EventCallback = (data: any) => void;
type EventListeners = { [key: string]: EventCallback[] };

class EyeSwitch {
  private options: EyeSwitchOptions;
  private state: EyeSwitchState;
  private eventListeners: EventListeners;

  constructor(options: EyeSwitchOptions = {}) {
    this.options = {
      toggleMode: 'focus',
      keyCombo: this.getDefaultKeyCombo(),
      onToggle: () => {},
      ...options
    };
    this.state = {
      isVisible: false,
      focusedFieldId: null
    };
    this.eventListeners = {};
  }

  private getDefaultKeyCombo(): string {
    if (typeof window !== 'undefined') {
      return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform) ? 'Cmd+8' : 'Ctrl+8';
    }
    return 'Ctrl+8';
  }

  public setToggleMode(mode: 'focus' | 'all'): void {
    this.options.toggleMode = mode;
    this.emit('modeChanged', mode);
  }

  public setKeyCombo(keyCombo: string): void {
    this.options.keyCombo = keyCombo;
    this.emit('keyComboChanged', keyCombo);
  }

  public handleKeyDown(event: KeyboardEvent): void {
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

  public setFocusedField(fieldId: string): void {
    this.state.focusedFieldId = fieldId;
  }

  public toggle(): void {
    if (this.options.toggleMode === 'focus' && !this.state.focusedFieldId) {
      return;
    }

    this.state.isVisible = !this.state.isVisible;
    this.emit('visibilityChanged', {
      isVisible: this.state.isVisible,
      affectedFields: this.options.toggleMode === 'all' ? 'all' : this.state.focusedFieldId
    });

    if (this.options.onToggle) {
      this.options.onToggle();
    }
  }

  public on(eventName: string, callback: EventCallback): void {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  public off(eventName: string, callback: EventCallback): void {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(cb => cb !== callback);
    }
  }

  private emit(eventName: string, data: any): void {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(callback => callback(data));
    }
  }
}

export default EyeSwitch;
