import { Icon } from '@iconify/react'
import type { TimerStatus } from '../../types/timer'

interface TimerControlsProps {
	toggle: () => void
	reset: () => void
	status: TimerStatus
	className?: string
}

export const TimerControls: React.FC<TimerControlsProps> = ({
	toggle,
	reset,
	status,
	className = '',
}) => {
	const isRunning = status === 'running'

	return (
		<div className={`flex justify-center space-x-6 ${className}`}>
			{/* Start/Pause Button */}
			<button
				onClick={toggle}
				disabled={status === 'completed'}
				className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isRunning
						? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25'
						: 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25'
					}`}
			>
				<Icon
					icon={isRunning ? 'material-symbols:pause' : 'material-symbols:play-arrow'}
					className="text-white text-3xl"
				/>
			</button>

			{/* Reset Button */}
			<button
				onClick={reset}
				className="w-20 h-20 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-lg shadow-gray-700/25"
			>
				<Icon icon="material-symbols:refresh" className="text-white text-3xl" />
			</button>
		</div>
	)
}
