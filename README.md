# EyeSwitch

EyeSwitch is a customizable React component for toggling password visibility in forms. It provides an intuitive user interface with keyboard shortcuts and supports both single and multiple password field toggling.

## Features

- Toggle password visibility for individual or all password fields
- Customizable keyboard shortcuts
- Responsive design
- Event logging
- Easy integration with existing React projects

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

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
