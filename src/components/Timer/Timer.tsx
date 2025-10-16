import { useTimer } from '../../hooks/useTimer'
import { TimerProgress } from './TimerProgress'
import { TimerControls } from './TimerControls'
import { Icon } from '@iconify/react'
import type { TimerConfig } from '../../types/timer'

interface TimerProps extends TimerConfig {
	className?: string
	onExit?: () => void
}

export const Timer: React.FC<TimerProps> = ({
	duration,
	onComplete,
	onTick,
	onExit,
	className = '',
}) => {
	const timer = useTimer({ duration, onComplete, onTick })

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}

	const totalMinutes = Math.floor(duration / 60)
	const currentSession = timer.status === 'completed' ? totalMinutes : Math.ceil((duration - timer.timeLeft) / 60)

	const handleExit = () => {
		if (onExit) {
			onExit()
		}
	}

	// Get current time and date
	const now = new Date()
	const currentTime = now.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	})
	const currentDate = now.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long'
	})

	return (
		<div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 ${className}`}>
			{/* Header */}
			<div className="text-center mb-12">
				<div className="flex items-center justify-center space-x-3 mb-4">
					<div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
						<Icon icon="material-symbols:school" className="text-white text-lg" />
					</div>
					<h1 className="text-2xl font-bold text-white">Study League</h1>
				</div>
				<h2 className="text-4xl font-bold text-white mb-2">Solo Study</h2>
			</div>

			{/* Timer Circle */}
			<div className="relative mb-12">
				<TimerProgress
					timeLeft={timer.timeLeft}
					totalTime={duration}
					className="mb-0"
				/>

				{/* Timer Display in Center */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<div className="text-6xl font-bold text-white mb-2">
						{formatTime(timer.timeLeft)}
					</div>
					<div className="text-lg text-gray-400 font-medium">Study</div>
				</div>
			</div>

			{/* Stats */}
			<div className="flex items-center space-x-8 mb-8 text-gray-300">
				<div className="flex items-center space-x-2">
					<Icon icon="material-symbols:timer" className="text-lg text-orange-500" />
					<span className="text-sm font-medium">{currentSession}/{totalMinutes} MINS</span>
				</div>
				<div className="flex items-center space-x-2">
					<Icon icon="material-symbols:refresh" className="text-lg text-orange-500" />
					<span className="text-sm font-medium">2/5</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mb-8">
				<h3 className="text-white text-lg font-semibold mb-6 text-center">MORE ACTIONS</h3>
				<div className="flex items-center space-x-4">
					{/* Music Button */}
					<button className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors">
						<Icon icon="material-symbols:music-note" className="text-white text-2xl" />
					</button>

					{/* Skip to Rest Button */}
					<button className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors">
						<Icon icon="material-symbols:skip-next" className="text-white text-2xl" />
					</button>

					{/* Change Timing Button */}
					<button className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors">
						<Icon icon="material-symbols:schedule" className="text-white text-2xl" />
					</button>

					{/* Exit Button */}
					<button
						onClick={handleExit}
						className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors"
					>
						<Icon icon="material-symbols:logout" className="text-white text-2xl" />
					</button>
				</div>
			</div>

			{/* Main Control Buttons */}
			<TimerControls
				toggle={timer.toggle}
				reset={timer.reset}
				status={timer.status}
				className="mb-0"
			/>

			{/* Top right info */}
			<div className="absolute top-8 right-8 text-right">
				<div className="text-2xl font-bold text-white mb-1">{currentTime}</div>
				<div className="text-sm text-gray-400 mb-4">{currentDate}</div>
				<div className="space-y-2">
					<div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
						<Icon icon="material-symbols:music-note" className="text-lg" />
						<span>Never Gonna Give You Up - Rick Astley</span>
					</div>
					<div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
						<Icon icon="material-symbols:location-on" className="text-lg" />
						<span>Library - McKinnon Way</span>
					</div>
				</div>
			</div>
		</div>
	)
}
