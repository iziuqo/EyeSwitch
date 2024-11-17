type EyeSwitchOptions = {
  toggleMode: 'focus' | 'all';
  keyCombo: string;
  onToggle: () => void;
};

class EyeSwitch {
  private options: EyeSwitchOptions;

  constructor(options: Partial<EyeSwitchOptions> = {}) {
    this.options = {
      toggleMode: 'focus',
      keyCombo: navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'Cmd+8' : 'Ctrl+8',
      onToggle: () => {},
      ...options
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public setToggleMode(mode: 'focus' | 'all') {
    this.options.toggleMode = mode;
  }

  public setKeyCombo(keyCombo: string) {
    this.options.keyCombo = keyCombo;
  }

  public handleKeyDown(event: KeyboardEvent) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
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
      this.options.onToggle();
    }
  }
}

export default EyeSwitch;
