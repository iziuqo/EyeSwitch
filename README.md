# EyeSwitch

EyeSwitch is a customizable React component for managing password visibility in forms. It provides an intuitive user interface with keyboard shortcuts and supports both single and multiple password field toggling, making it an ideal solution for modern web applications.

## Features

- Toggle password visibility for individual or all password fields
- Customizable keyboard shortcuts (Ctrl+8, Cmd+8, Ctrl+Shift+L, Alt+P)
- Two toggle modes: Focus (toggle only the focused field) and All (toggle all password fields)
- Responsive design with a sleek, dark-themed UI
- Real-time event logging
- Easy integration with existing React projects
- Built with accessibility in mind
- Utilizes React hooks for state management
- Implements shadcn/ui components for a consistent look and feel

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/iziuqo/eye-switch.git
   ```
2. Navigate to the project directory:
   ```
   cd eye-switch
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

## Usage

### Basic Usage

Import the `EyeSwitchDemo` component and use it in your React application:

```jsx
import EyeSwitchDemo from '@/components/eye-switch-demo'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <EyeSwitchDemo />
    </div>
  )
}
```

### Advanced Usage

The EyeSwitch component is highly customizable. Here's an example of how to use it with custom settings:

```jsx
import { useState, useEffect, useRef } from 'react'
import EyeSwitch from '@/lib/eye-switch'

function CustomPasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const eyeSwitchRef = useRef(null)

  useEffect(() => {
    eyeSwitchRef.current = new EyeSwitch({
      toggleMode: 'focus',
      keyCombo: 'Ctrl+Shift+L',
      onToggle: () => setPasswordVisible(prev => !prev)
    })

    return () => {
      // Clean up event listeners
    }
  }, [])

  return (
    <form>
      <input
        type={passwordVisible ? 'text' : 'password'}
        placeholder="Enter password"
      />
      {/* Add more form elements as needed */}
    </form>
  )
}
```

## API

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

The EyeSwitch demo uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind classes in the component or by overriding the styles in your CSS.

## Accessibility

EyeSwitch is built with accessibility in mind, using proper ARIA attributes and keyboard navigation support.

## Browser Support

EyeSwitch is compatible with modern browsers that support ES6+ features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
