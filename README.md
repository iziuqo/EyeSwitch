# EyeSwitch

EyeSwitch is a versatile, framework-agnostic JavaScript library designed to manage password visibility in forms. It provides an intuitive interface with customizable keyboard shortcuts and supports both single and multiple password field toggling, making it an ideal solution for modern web applications across various platforms and environments.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Basic Usage](#basic-usage)
   - [Advanced Usage](#advanced-usage)
4. [API Reference](#api-reference)
5. [Customization](#customization)
6. [Accessibility](#accessibility)
7. [Browser Support](#browser-support)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- Framework-agnostic: Can be used with any JavaScript framework or vanilla JS
- Environment flexible: Works in browser, mobile, and desktop environments
- Toggle password visibility for individual or all password fields
- Customizable keyboard shortcuts (e.g., Ctrl+8, Cmd+8, Ctrl+Shift+L, Alt+P)
- Two toggle modes: Focus (toggle only the focused field) and All (toggle all password fields)
- Real-time event logging
- Easy integration with existing projects
- Built with accessibility in mind
- Utilizes a simple event system for maximum flexibility

## Installation

You can install EyeSwitch using npm:

```bash
npm install eye-switch
```

Or using yarn:

```bash
yarn add eye-switch
```

Alternatively, you can include it directly in your HTML file:

```html
<script src="https://unpkg.com/eye-switch@latest/dist/eye-switch.min.js"></script>
```

## Usage

### Basic Usage

Here's an example of how to use EyeSwitch in a vanilla JavaScript project:

```javascript
import EyeSwitch from 'eye-switch';

const eyeSwitch = new EyeSwitch({
  toggleMode: 'all',
  keyCombo: 'Ctrl+Shift+L',
  onToggle: () => console.log('Visibility toggled')
});

// Add event listeners
eyeSwitch.on('visibilityChanged', ({ isVisible, affectedFields }) => {
  const passwordFields = document.querySelectorAll('input[type="password"]');
  passwordFields.forEach(field => {
    field.type = isVisible ? 'text' : 'password';
  });
});

// Handle key events
document.addEventListener('keydown', (event) => eyeSwitch.handleKeyDown(event));

// Toggle visibility programmatically
document.querySelector('#toggleButton').addEventListener('click', () => eyeSwitch.toggle());
```

### Advanced Usage

Here's an example of how to use EyeSwitch with React:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import EyeSwitch from 'eye-switch';

function PasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const eyeSwitchRef = useRef(null);

  useEffect(() => {
    eyeSwitchRef.current = new EyeSwitch({
      toggleMode: 'focus',
      keyCombo: 'Ctrl+Shift+L',
      onToggle: () => setPasswordVisible(prev => !prev)
    });

    const handleKeyDown = (event) => eyeSwitchRef.current.handleKeyDown(event);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form>
      <input
        type={passwordVisible ? 'text' : 'password'}
        placeholder="Enter password"
      />
      <button type="button" onClick={() => eyeSwitchRef.current.toggle()}>
        {passwordVisible ? 'Hide' : 'Show'} Password
      </button>
    </form>
  );
}

export default PasswordForm;
```

## API Reference

### EyeSwitch Class

The `EyeSwitch` class is the core of the library. It accepts the following options:

- `toggleMode`: 'focus' | 'all' (default: 'focus')
- `keyCombo`: string (default: 'Ctrl+8' or 'Cmd+8' on Mac)
- `onToggle`: () => void

### Methods

- `setToggleMode(mode: 'focus' | 'all')`: Set the toggle mode
- `setKeyCombo(keyCombo: string)`: Set the keyboard shortcut
- `handleKeyDown(event: KeyboardEvent)`: Handle keydown events
- `setFocusedField(fieldId: string)`: Set the currently focused field
- `toggle()`: Toggle password visibility

### Events

- `visibilityChanged`: Fired when password visibility changes
- `modeChanged`: Fired when toggle mode changes
- `keyComboChanged`: Fired when the keyboard shortcut changes

## Customization

EyeSwitch is highly customizable. You can adjust the toggle mode, keyboard shortcuts, and event handlers to fit your specific needs.

```javascript
const eyeSwitch = new EyeSwitch({
  toggleMode: 'all',
  keyCombo: 'Alt+P',
  onToggle: () => {
    // Custom toggle logic
  }
});

eyeSwitch.setKeyCombo('Ctrl+Shift+V');
eyeSwitch.setToggleMode('focus');
```

## Accessibility

EyeSwitch is built with accessibility in mind. It supports keyboard navigation and can be easily integrated with screen readers. When implementing your own UI, ensure to maintain these accessibility features:

- Use proper ARIA attributes for toggle buttons
- Provide clear, descriptive labels for password fields
- Ensure keyboard navigation works correctly

## Browser Support

EyeSwitch is compatible with modern browsers that support ES6+ features. For older browser support, consider using appropriate polyfills or transpiling the code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
```

This documentation provides a comprehensive guide to using the EyeSwitch library, including installation instructions, usage examples, API reference, and information about customization and accessibility. Users should be able to quickly understand how to integrate and use EyeSwitch in their projects.
