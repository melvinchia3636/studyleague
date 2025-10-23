import { useState } from 'react'

import { TIMER_DURATIONS } from './Timer/constants/timer'

export const Settings = () => {
  const [pomodoroTime, setPomodoroTime] = useState(
    TIMER_DURATIONS.POMODORO / 60
  )
  const [shortBreakTime, setShortBreakTime] = useState(
    TIMER_DURATIONS.SHORT_BREAK / 60
  )
  const [longBreakTime, setLongBreakTime] = useState(
    TIMER_DURATIONS.LONG_BREAK / 60
  )
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleSave = () => {
    // Here you would typically save to localStorage or a backend
    alert('Settings saved!')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 p-8">
      <div className="w-full max-w-2xl rounded-3xl bg-gray-900 p-12 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-100">Settings</h1>

        <div className="space-y-8">
          {/* Timer Durations */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-200">
              Timer Durations (minutes)
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Pomodoro
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  max="60"
                  min="1"
                  type="number"
                  value={pomodoroTime}
                  onChange={e => setPomodoroTime(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Short Break
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  max="30"
                  min="1"
                  type="number"
                  value={shortBreakTime}
                  onChange={e => setShortBreakTime(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Long Break
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  max="60"
                  min="5"
                  type="number"
                  value={longBreakTime}
                  onChange={e => setLongBreakTime(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-200">
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Notifications</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-gray-600'
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
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Sound</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
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

          {/* Save Button */}
          <div className="pt-4">
            <button
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
