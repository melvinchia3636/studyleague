import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

import { TIMER_DURATIONS } from '../pages/Timer/constants/timer'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [pomodoroTime, setPomodoroTime] = useState(
    TIMER_DURATIONS.POMODORO / 60
  )
  const [shortBreakTime, setShortBreakTime] = useState(
    TIMER_DURATIONS.SHORT_BREAK / 60
  )
  const [longBreakTime, setLongBreakTime] = useState(
    TIMER_DURATIONS.LONG_BREAK / 60
  )
  const [notifications, setNotifications] = useState(true) // For notification setting
  const [soundEnabled, setSoundEnabled] = useState(true) // Global sound setting
  const [isAnimating, setIsAnimating] = useState(false) // For animation state
  const [shouldRender, setShouldRender] = useState(false) // For mounting/unmounting

  // Handle modal transitions
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to ensure the element is rendered before starting animation
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleSave = () => {
    // Here you would typically save to localStorage or a backend
    alert('Settings saved!')
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative max-h-[90vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
          isAnimating
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <button
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            onClick={onClose}
          >
            <Icon className="text-xl" icon="material-symbols:close" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8 p-6">
          {/* Timer Durations */}
          <div>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <Icon
                className="mr-2 text-orange-500"
                icon="material-symbols:timer"
              />
              Timer Durations (minutes)
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pomodoro
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  max="60"
                  min="1"
                  type="number"
                  value={pomodoroTime}
                  onChange={e => setPomodoroTime(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Short Break
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  max="30"
                  min="1"
                  type="number"
                  value={shortBreakTime}
                  onChange={e => setShortBreakTime(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Long Break
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  max="60"
                  min="5"
                  type="number"
                  value={longBreakTime}
                  onChange={e => setLongBreakTime(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Notifications & Preferences */}
          <div>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <Icon
                className="mr-2 text-orange-500"
                icon="material-symbols:notifications"
              />
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    className="text-gray-500"
                    icon="material-symbols:notifications-outline"
                  />
                  <span className="font-medium text-gray-900">
                    Enable Notifications
                  </span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    className="text-gray-500"
                    icon="material-symbols:volume-up"
                  />
                  <span className="font-medium text-gray-900">
                    Enable Sound
                  </span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <Icon
                className="mr-2 text-orange-500"
                icon="material-symbols:person"
              />
              Account
            </h2>
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <Icon
                    className="text-gray-500"
                    icon="material-symbols:edit"
                  />
                  <span className="font-medium text-gray-900">
                    Edit Profile
                  </span>
                </div>
                <Icon
                  className="text-gray-400"
                  icon="material-symbols:chevron-right"
                />
              </button>
              <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <Icon
                    className="text-gray-500"
                    icon="material-symbols:lock"
                  />
                  <span className="font-medium text-gray-900">
                    Change Password
                  </span>
                </div>
                <Icon
                  className="text-gray-400"
                  icon="material-symbols:chevron-right"
                />
              </button>
              <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <Icon
                    className="text-gray-500"
                    icon="material-symbols:privacy-tip"
                  />
                  <span className="font-medium text-gray-900">
                    Privacy Settings
                  </span>
                </div>
                <Icon
                  className="text-gray-400"
                  icon="material-symbols:chevron-right"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
          <button
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center space-x-2 rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-600"
            onClick={handleSave}
          >
            <Icon icon="material-symbols:save" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
