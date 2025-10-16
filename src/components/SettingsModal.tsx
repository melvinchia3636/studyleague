import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { TIMER_DURATIONS } from '../constants/timer'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
	const [pomodoroTime, setPomodoroTime] = useState(TIMER_DURATIONS.POMODORO / 60)
	const [shortBreakTime, setShortBreakTime] = useState(TIMER_DURATIONS.SHORT_BREAK / 60)
	const [longBreakTime, setLongBreakTime] = useState(TIMER_DURATIONS.LONG_BREAK / 60)
	const [notifications, setNotifications] = useState(true)	// For notification setting
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
		<div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
			}`}>
			{/* Backdrop */}
			<div
				className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-0'
					}`}
				onClick={onClose}
			></div>

			{/* Modal Content */}
			<div className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${isAnimating
					? 'opacity-100 scale-100 translate-y-0'
					: 'opacity-0 scale-95 translate-y-4'
				}`}>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
					<button
						onClick={onClose}
						className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<Icon icon="material-symbols:close" className="text-xl" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-8">
					{/* Timer Durations */}
					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
							<Icon icon="material-symbols:timer" className="mr-2 text-orange-500" />
							Timer Durations (minutes)
						</h2>
						<div className="grid gap-4 md:grid-cols-3">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Pomodoro
								</label>
								<input
									type="number"
									value={pomodoroTime}
									onChange={(e) => setPomodoroTime(parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									min="1"
									max="60"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Short Break
								</label>
								<input
									type="number"
									value={shortBreakTime}
									onChange={(e) => setShortBreakTime(parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									min="1"
									max="30"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Long Break
								</label>
								<input
									type="number"
									value={longBreakTime}
									onChange={(e) => setLongBreakTime(parseInt(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									min="5"
									max="60"
								/>
							</div>
						</div>
					</div>

					{/* Notifications & Preferences */}
					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
							<Icon icon="material-symbols:notifications" className="mr-2 text-orange-500" />
							Preferences
						</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<Icon icon="material-symbols:notifications-outline" className="text-gray-500" />
									<span className="text-gray-900 font-medium">Enable Notifications</span>
								</div>
								<button
									onClick={() => setNotifications(!notifications)}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-orange-500' : 'bg-gray-300'
										}`}
								>
									<span
										className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'
											}`}
									/>
								</button>
							</div>
							<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<Icon icon="material-symbols:volume-up" className="text-gray-500" />
									<span className="text-gray-900 font-medium">Enable Sound</span>
								</div>
								<button
									onClick={() => setSoundEnabled(!soundEnabled)}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${soundEnabled ? 'bg-orange-500' : 'bg-gray-300'
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

					{/* Account Settings */}
					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
							<Icon icon="material-symbols:person" className="mr-2 text-orange-500" />
							Account
						</h2>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<div className="flex items-center space-x-3">
									<Icon icon="material-symbols:edit" className="text-gray-500" />
									<span className="text-gray-900 font-medium">Edit Profile</span>
								</div>
								<Icon icon="material-symbols:chevron-right" className="text-gray-400" />
							</button>
							<button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<div className="flex items-center space-x-3">
									<Icon icon="material-symbols:lock" className="text-gray-500" />
									<span className="text-gray-900 font-medium">Change Password</span>
								</div>
								<Icon icon="material-symbols:chevron-right" className="text-gray-400" />
							</button>
							<button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<div className="flex items-center space-x-3">
									<Icon icon="material-symbols:privacy-tip" className="text-gray-500" />
									<span className="text-gray-900 font-medium">Privacy Settings</span>
								</div>
								<Icon icon="material-symbols:chevron-right" className="text-gray-400" />
							</button>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
					<button
						onClick={onClose}
						className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
					>
						<Icon icon="material-symbols:save" />
						<span>Save Settings</span>
					</button>
				</div>
			</div>
		</div>
	)
}
