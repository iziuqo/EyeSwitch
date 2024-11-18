'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Coffee, Github, EyeIcon, Play, Eye, EyeOff, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Component() {
  const [activeSection, setActiveSection] = useState('features')
  const [showPassword, setShowPassword] = useState(false)
  const [isMac, setIsMac] = useState(false)

  const featuresRef = useRef<HTMLElement>(null)
  const installationRef = useRef<HTMLElement>(null)
  const usageRef = useRef<HTMLElement>(null)
  const apiRef = useRef<HTMLElement>(null)

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 64

      const sections = [
        { id: 'features', ref: featuresRef },
        { id: 'installation', ref: installationRef },
        { id: 'usage', ref: usageRef },
        { id: 'API', ref: apiRef },
      ]

      for (const section of sections) {
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((isMac && event.metaKey && event.key === '8') || (!isMac && event.ctrlKey && event.key === '8')) {
      event.preventDefault()
      setShowPassword(prev => !prev)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMac])

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      const headerHeight = 64
      const elementPosition = sectionRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const basicUsageCode = `
import EyeSwitch from 'eye-switch';

const eyeSwitch = new EyeSwitch({
  toggleMode: 'all',
  keyCombo: 'Ctrl+Shift+L',
  onToggle: () => console.log('Visibility toggled')
});

eyeSwitch.on('visibilityChanged', ({ isVisible, affectedFields }) => {
  const passwordFields = document.querySelectorAll('input[type="password"]');
  passwordFields.forEach(field => {
    field.type = isVisible ? 'text' : 'password';
  });
});

document.addEventListener('keydown', (event) => eyeSwitch.handleKeyDown(event));

document.querySelector('#toggleButton').addEventListener('click', () => eyeSwitch.toggle());
  `

  const advancedUsageCode = `
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
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 flex flex-col antialiased">
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="max-w-6xl mx-auto w-full py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-xl">
                <EyeIcon className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-light tracking-tight">
                Eye<span className="font-semibold">Switch</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              {[
                { id: 'features', ref: featuresRef },
                { id: 'installation', ref: installationRef },
                { id: 'usage', ref: usageRef },
                { id: 'API', ref: apiRef },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`text-sm hover:text-blue-400 transition-colors ${
                    activeSection === item.id ? 'text-blue-400 font-medium' : 'text-gray-300'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.id === 'API' ? 'API' : item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full py-12 px-4" ref={mainRef}>
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Seamless Password Visibility Control
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                EyeSwitch is a versatile, framework-agnostic JavaScript library designed to manage password visibility in forms with customizable keyboard shortcuts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                  <Link href="/demo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Play className="mr-2 h-4 w-4" />
                    See Demo
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white font-medium px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                  <a href="https://github.com/iziuqo/EyeSwitch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 bg-gray-800/50 rounded-lg p-8 shadow-lg backdrop-blur-sm">
              <div className="relative max-w-sm mx-auto">
                <Input
                  type={showPassword ? "text" : "password"}
                  value="password123"
                  className="pr-10 bg-gray-700/50 border-gray-600 text-lg rounded-full"
                  readOnly
                />
                <button
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute -top-12 right-1 whitespace-nowrap bg-blue-600 text-white text-sm py-2 px-4 rounded-md shadow-md">
                  Show password ({isMac ? '⌘' : 'Ctrl'} + 8)
                  <div className="absolute bottom-[-6px] right-[10px] w-3 h-3 bg-blue-600 transform rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mb-24" ref={featuresRef}>
          <h2 className="text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            {[
              "Framework-agnostic: Use with any JavaScript framework or vanilla JS",
              "Environment flexible: Works in browser, mobile, and desktop environments",
              "Toggle password visibility for individual or all password fields",
              "Customizable keyboard shortcuts",
              "Two toggle modes: Focus and All",
              "Real-time event logging",
              "Easy integration with existing projects",
              "Built with accessibility in mind"
            ].map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="installation" className="mb-24" ref={installationRef}>
          <h2 className="text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Installation</h2>
          <div className="bg-gray-800/30 p-6 rounded-lg mb-4 backdrop-blur-sm">
            <code className="text-blue-300 text-lg">npm install eye-switch</code>
          </div>
          <p className="text-gray-300 mb-2">Or using yarn:</p>
          <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm">
            <code className="text-blue-300 text-lg">yarn add eye-switch</code>
          </div>
        </section>

        <section id="usage" className="mb-24" ref={usageRef}>
          <h2 className="text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Usage</h2>
          <h3 className="text-2xl font-medium mb-4 text-gray-200">Basic Usage</h3>
          <div className="bg-gray-800/30 rounded-lg mb-12 overflow-hidden backdrop-blur-sm">
            <SyntaxHighlighter 
              language="javascript" 
              style={vscDarkPlus}
              customStyle={{
                background: 'transparent',
                padding: '1.5rem',
                fontSize: '1rem',
                lineHeight: '1.5',
              }}
            >
              {basicUsageCode}
            </SyntaxHighlighter>
          </div>
          <h3 className="text-2xl font-medium mb-4 text-gray-200">Advanced Usage with React</h3>
          <div className="bg-gray-800/30 rounded-lg mb-8 overflow-hidden backdrop-blur-sm">
            <SyntaxHighlighter 
              language="jsx" 
              style={vscDarkPlus}
              customStyle={{
                background: 'transparent',
                padding: '1.5rem',
                fontSize: '1rem',
                lineHeight: '1.5',
              }}
            >
              {advancedUsageCode}
            </SyntaxHighlighter>
          </div>
        </section>

        <section id="API" className="mb-24" ref={apiRef}>
          <h2 className="text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">API Reference</h2>
          <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-medium mb-4 text-gray-200">EyeSwitch Class</h3>
            <p className="text-gray-300 mb-4">The <code className="bg-gray-700 px-2 py-1 rounded">EyeSwitch</code> class accepts the following options:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li><code className="bg-gray-700 px-2 py-1 rounded">toggleMode</code>: &apos;focus&apos; | &apos;all&apos; (default: &apos;focus&apos;)</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">keyCombo</code>: string (default: &apos;Ctrl+8&apos; or &apos;Cmd+8&apos; on Mac)</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">onToggle</code>: () {'=>'} void</li>
            </ul>
            <h3 className="text-2xl font-medium mb-4 text-gray-200">Methods</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li><code className="bg-gray-700 px-2 py-1 rounded">setToggleMode(mode: &apos;focus&apos; | &apos;all&apos;)</code>: Set the toggle mode</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">setKeyCombo(keyCombo: string)</code>: Set the keyboard shortcut</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">handleKeyDown(event: KeyboardEvent)</code>: Handle keydown events</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">setFocusedField(fieldId: string)</code>: Set the currently focused field</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">toggle()</code>: Toggle password visibility</li>
            </ul>
            <h3 className="text-2xl font-medium mb-4 text-gray-200">Events</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><code className="bg-gray-700 px-2 py-1 rounded">visibilityChanged</code>: Fired when password visibility changes</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">modeChanged</code>: Fired when toggle mode changes</li>
              <li><code className="bg-gray-700 px-2 py-1 rounded">keyComboChanged</code>: Fired when the keyboard shortcut changes</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto w-full py-8 px-4 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <span>Made with ☕️ by </span>
            <a
              href="https://github.com/iziuqo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              @iziuqo
            </a>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black border-none shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 text-xs py-1 h-7 rounded-full"
            asChild
          >
            <a
              href="https://www.buymeacoffee.com/iziuqo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1"
            >
              <Coffee className="h-3 w-3" />
              <span>Buy me a coffee</span>
            </a>
          </Button>
        </div>
      </footer>
    </div>
  )
}
