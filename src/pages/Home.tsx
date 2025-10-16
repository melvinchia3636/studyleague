import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Timer } from '../components/Timer/Timer'
import { TIMER_DURATIONS } from '../constants/timer'

export const Home = () => {
	const [showTimer, setShowTimer] = useState(false)

	const handleStartStudying = () => {
		setShowTimer(true)
	}

	const handleTimerComplete = () => {
		// Handle timer completion
		console.log('Timer completed!')
		setShowTimer(false)
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Timer Modal */}
			{showTimer && (
				<div className="fixed inset-0 z-50">
					<Timer
						duration={TIMER_DURATIONS.POMODORO}
						onComplete={handleTimerComplete}
						onExit={() => setShowTimer(false)}
						className="!min-h-screen !w-full !bg-gradient-to-br !from-gray-900 !via-gray-800 !to-gray-900"
					/>
				</div>
			)}

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{/* Today Stats Card */}
				<div className="lg:col-span-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-8 text-white relative overflow-hidden">
					<div className="relative z-10">
						<div className="text-sm font-medium mb-2">Today Stats</div>
						<div className="text-5xl font-bold mb-4">9.2 Hours</div>
						<div className="text-sm mb-6">
							<div>"This is a quote."</div>
							<div className="text-orange-200">--- The designer.</div>
						</div>
						<button
							onClick={handleStartStudying}
							className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
						>
							<Icon icon="material-symbols:play-arrow" className="text-lg" />
							<span>Start Studying</span>
						</button>
					</div>
					{/* Background decoration */}
					<div className="absolute right-0 top-0 w-64 h-64 opacity-20">
						<div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
					</div>
				</div>				{/* Weekly Goals Card */}
				<div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
					<div className="relative z-10">
						<div className="text-sm font-medium mb-2">Your Weekly Goals</div>
						<div className="text-4xl font-bold mb-2">23.9 Hrs</div>
						<div className="text-indigo-200 text-sm mb-6">Remaining</div>

						{/* Progress visualization */}
						<div className="relative">
							<svg className="w-full h-20" viewBox="0 0 200 60">
								<path
									d="M20,40 Q60,10 100,30 T180,25"
									stroke="rgba(255,255,255,0.3)"
									strokeWidth="2"
									fill="none"
								/>
								<path
									d="M20,40 Q60,10 100,30 T140,28"
									stroke="white"
									strokeWidth="2"
									fill="none"
								/>
								<circle cx="140" cy="28" r="3" fill="white" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Study Rooms Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Open Study Rooms</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }, (_, i) => (
						<div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
							{/* Room Image */}
							<div className="relative h-40 bg-gray-100">
								<img
									src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
									alt="Study Room"
									className="w-full h-full object-cover"
								/>

								{/* Room Stats Overlay */}
								<div className="absolute bottom-3 left-3 flex space-x-2">
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:person" className="text-sm" />
										<span>50</span>
									</div>
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:schedule" className="text-sm" />
										<span>25m</span>
									</div>
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:volume-off" className="text-sm" />
									</div>
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:videocam" className="text-sm" />
									</div>
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:chat" className="text-sm" />
									</div>
								</div>
							</div>

							{/* Room Info */}
							<div className="p-4">
								<h3 className="font-semibold text-gray-900 mb-1">Focus Room (25 mins)</h3>
								<p className="text-sm text-gray-500 mb-4">Public Room</p>

								<button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
									<Icon icon="material-symbols:play-arrow" className="text-lg" />
									<span>Start Studying</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}