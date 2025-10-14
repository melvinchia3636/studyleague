import { useState } from 'react'
import { TIMER_DURATIONS } from '../constants/timer'

export const Settings = () => {
    const [pomodoroTime, setPomodoroTime] = useState(TIMER_DURATIONS.POMODORO / 60)
    const [shortBreakTime, setShortBreakTime] = useState(TIMER_DURATIONS.SHORT_BREAK / 60)
    const [longBreakTime, setLongBreakTime] = useState(TIMER_DURATIONS.LONG_BREAK / 60)
    const [notifications, setNotifications] = useState(true)
    const [soundEnabled, setSoundEnabled] = useState(true)

    const handleSave = () => {
        // Here you would typically save to localStorage or a backend
        alert('Settings saved!')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
            <div className="bg-gray-900 rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-100 mb-8">Settings</h1>

                <div className="space-y-8">
                    {/* Timer Durations */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-200 mb-4">Timer Durations (minutes)</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Pomodoro
                                </label>
                                <input
                                    type="number"
                                    value={pomodoroTime}
                                    onChange={(e) => setPomodoroTime(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Short Break
                                </label>
                                <input
                                    type="number"
                                    value={shortBreakTime}
                                    onChange={(e) => setShortBreakTime(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Long Break
                                </label>
                                <input
                                    type="number"
                                    value={longBreakTime}
                                    onChange={(e) => setLongBreakTime(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="5"
                                    max="60"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-200 mb-4">Preferences</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Enable Notifications</span>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Enable Sound</span>
                                <button
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}