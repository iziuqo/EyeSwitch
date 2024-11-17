"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Eye, EyeOff, Info, Coffee, EyeIcon, Keyboard, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EyeSwitch from "@/lib/eye-switch"

export default function EyeSwitchDemo() {
  const [passwordFields, setPasswordFields] = useState({
    password: { visible: false, ref: useRef<HTMLInputElement>(null) },
    confirmPassword: { visible: false, ref: useRef<HTMLInputElement>(null) }
  })
  const [mode, setMode] = useState<"focus" | "all">("focus")
  const [keyCombo, setKeyCombo] = useState<string>("Ctrl+8")
  const [logs, setLogs] = useState<string[]>([])
  const eyeSwitchRef = useRef<EyeSwitch | null>(null)

  const addLog = useCallback((message: string) => {
    setLogs(prev => [message, ...prev.slice(0, 4)])
  }, [])

  useEffect(() => {
    eyeSwitchRef.current = new EyeSwitch()
    const eyeSwitch = eyeSwitchRef.current

    eyeSwitch.on('visibilityChanged', ({ isVisible, affectedFields }) => {
      setPasswordFields(prev => {
        const newState = { ...prev }
        if (affectedFields === 'all') {
          Object.keys(newState).forEach(key => {
            newState[key as keyof typeof newState].visible = isVisible
          })
        } else {
          const field = newState[affectedFields as keyof typeof newState]
          if (field) {
            field.visible = isVisible
          }
        }
        return newState
      })
      addLog(`Password ${isVisible ? "shown" : "hidden"} - (${mode} mode)`)
    })

    eyeSwitch.on('modeChanged', (newMode) => {
      setMode(newMode)
      addLog(`Switched to ${newMode === "all" ? "Toggle All" : "Focus"} Mode`)
    })

    eyeSwitch.on('keyComboChanged', (newKeyCombo) => {
      setKeyCombo(newKeyCombo)
      addLog(`Key combo changed to ${newKeyCombo}`)
    })

    const handleKeyDown = (event: KeyboardEvent) => eyeSwitch.handleKeyDown(event)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [addLog, mode])

  const handleFocus = useCallback((fieldName: 'password' | 'confirmPassword') => {
    eyeSwitchRef.current?.setFocusedField(fieldName)
  }, [])

  const handleToggle = useCallback((fieldName: 'password' | 'confirmPassword') => {
    eyeSwitchRef.current?.toggle()
  }, [])

  const handleModeChange = useCallback((checked: boolean) => {
    eyeSwitchRef.current?.setToggleMode(checked ? "all" : "focus")
  }, [])

  const handleKeyComboChange = useCallback((value: string) => {
    eyeSwitchRef.current?.setKeyCombo(value)
  }, [])

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 p-4 flex items-center justify-center antialiased">
      <div className="w-full max-w-5xl backdrop-blur-xl bg-gray-900/50 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-gray-800 overflow-hidden flex flex-col">
        <div className="p-6 flex-grow overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-xl">
                <EyeIcon className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-light tracking-tight">
                Eye<span className="font-semibold">Switch</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xs text-gray-400">v1.0.0</p>
              <a
                href="#"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-400 flex items-center gap-2 mb-6">
            <Keyboard className="h-4 w-4" />
            Seamless password visibility control with keyboard shortcuts for modern web apps
          </p>

          <div className="relative grid md:grid-cols-2 gap-6">
            <div className="space-y-4 relative z-10">
              <h2 className="text-lg font-medium tracking-tight">Demo</h2>
              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-medium text-gray-300">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      ref={passwordFields.password.ref}
                      type={passwordFields.password.visible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-gray-900/30 border-gray-800 text-gray-200 placeholder:text-gray-600 text-sm h-9"
                      onFocus={() => handleFocus('password')}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-gray-800/30 text-gray-400 hover:text-gray-200"
                            onClick={() => handleToggle('password')}
                            aria-label={passwordFields.password.visible ? "Hide password" : "Show password"}
                          >
                            {passwordFields.password.visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="z-50">
                          <p>{passwordFields.password.visible ? "Hide" : "Show"} password ({keyCombo})</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-xs font-medium text-gray-300">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      ref={passwordFields.confirmPassword.ref}
                      type={passwordFields.confirmPassword.visible ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="bg-gray-900/30 border-gray-800 text-gray-200 placeholder:text-gray-600 text-sm h-9"
                      onFocus={() => handleFocus('confirmPassword')}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-gray-800/30 text-gray-400 hover:text-gray-200"
                            onClick={() => handleToggle('confirmPassword')}
                            aria-label={passwordFields.confirmPassword.visible ? "Hide password" : "Show password"}
                          >
                            {passwordFields.confirmPassword.visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="z-50">
                          <p>{passwordFields.confirmPassword.visible ? "Hide" : "Show"} password ({keyCombo})</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  Try using the keyboard shortcut ({keyCombo}) to toggle password visibility!
                </p>
              </div>
            </div>

            <div className="space-y-4 md:absolute md:top-0 md:right-0 md:w-1/2">
              <h2 className="text-lg font-medium tracking-tight">Config</h2>
              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="toggle-mode" className="text-xs font-medium text-gray-300">Toggle Mode</Label>
                    <p className="text-xs text-gray-500">{mode === "focus" ? "Toggle focused field only" : "Toggle all password fields"}</p>
                  </div>
                  <Switch
                    id="toggle-mode"
                    checked={mode === "all"}
                    onCheckedChange={handleModeChange}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key-combo" className="text-xs font-medium text-gray-300">Keyboard Shortcut</Label>
                  <Select onValueChange={handleKeyComboChange} defaultValue={keyCombo}>
                    <SelectTrigger id="key-combo" className="bg-gray-900/30 border-gray-800 text-gray-200 text-sm h-9">
                      <SelectValue placeholder="Select a key combo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="Ctrl+8">Ctrl + 8</SelectItem>
                      <SelectItem value="Cmd+8">Cmd + 8 (Mac)</SelectItem>
                      <SelectItem value="Ctrl+Shift+L">Ctrl + Shift + L</SelectItem>
                      <SelectItem value="Alt+P">Alt + P</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Current shortcut: <kbd className="px-1 py-0.5 text-xs font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded">{keyCombo}</kbd></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-sm font-medium">Event Log</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Recent actions performed on the password fields</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="bg-gray-900/30 rounded-lg border border-gray-800/50 p-2 h-16 overflow-y-auto text-xs">
              {logs.map((log, index) => (
                <p key={index} className="text-gray-400">{log}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              <span>Made with ☕️ by </span>
              <a
                href="https://github.com/izaiascrs"
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
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black border-none shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 text-xs py-1 h-7"
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
        </div>
      </div>
    </div>
  )
}
