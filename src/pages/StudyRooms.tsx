import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Timer } from '../components/Timer/Timer'
import { TIMER_DURATIONS } from '../constants/timer'

export const StudyRooms = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [showSoloTimer, setShowSoloTimer] = useState(false)
	const [selectedDuration, setSelectedDuration] = useState(TIMER_DURATIONS.POMODORO)

	const soloStudyOptions = [
		{ name: 'Pomodoro (25 min)', duration: TIMER_DURATIONS.POMODORO, icon: 'material-symbols:timer' },
		{ name: 'Short Session (15 min)', duration: 900, icon: 'material-symbols:schedule' },
		{ name: 'Long Session (50 min)', duration: 3000, icon: 'material-symbols:hourglass-full' },
		{ name: 'Custom Timer', duration: 0, icon: 'material-symbols:edit' },
	]

	const studyRooms = [
		{
			id: 1,
			name: 'Focus Room (25 mins)',
			type: 'Public Room',
			participants: 50,
			duration: '25m',
			features: ['silent', 'video', 'chat'],
			image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			id: 2,
			name: 'Deep Work Session',
			type: 'Public Room',
			participants: 32,
			duration: '90m',
			features: ['silent', 'video'],
			image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			id: 3,
			name: 'Study Group - Math',
			type: 'Subject Room',
			participants: 15,
			duration: '60m',
			features: ['chat', 'voice', 'screen-share'],
			image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			id: 4,
			name: 'Language Learning',
			type: 'Subject Room',
			participants: 28,
			duration: '45m',
			features: ['chat', 'voice'],
			image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			id: 5,
			name: 'Coding Bootcamp',
			type: 'Subject Room',
			participants: 22,
			duration: '120m',
			features: ['silent', 'screen-share', 'chat'],
			image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			id: 6,
			name: 'Medical Study Group',
			type: 'Subject Room',
			participants: 18,
			duration: '75m',
			features: ['chat', 'voice', 'video'],
			image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
	]

	const filteredRooms = studyRooms.filter(room =>
		room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		room.type.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const getFeatureIcon = (feature: string) => {
		switch (feature) {
			case 'silent': return 'material-symbols:volume-off'
			case 'video': return 'material-symbols:videocam'
			case 'chat': return 'material-symbols:chat'
			case 'voice': return 'material-symbols:mic'
			case 'screen-share': return 'material-symbols:screen-share'
			default: return 'material-symbols:check'
		}
	}

	const handleSoloStudy = (duration: number) => {
		setSelectedDuration(duration)
		setShowSoloTimer(true)
	}

	const handleTimerComplete = () => {
		console.log('Solo study session completed!')
		setShowSoloTimer(false)
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Solo Timer Modal */}
			{showSoloTimer && (
				<div className="fixed inset-0 z-50">
					<Timer
						duration={selectedDuration}
						onComplete={handleTimerComplete}
						onExit={() => setShowSoloTimer(false)}
						className="!min-h-screen !w-full !bg-gradient-to-br !from-gray-900 !via-gray-800 !to-gray-900"
					/>
				</div>
			)}

			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Study Rooms</h1>
				<p className="text-gray-600">Join a study room or start a solo session</p>
			</div>

			{/* Solo Study Options */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">Solo Study</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{soloStudyOptions.map((option, index) => (
						<button
							key={index}
							onClick={() => option.duration > 0 && handleSoloStudy(option.duration)}
							className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300 group"
						>
							<div className="flex items-center space-x-3 mb-3">
								<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
									<Icon icon={option.icon} className="text-orange-600 text-xl" />
								</div>
								<div className="text-left">
									<div className="font-medium text-gray-900">{option.name}</div>
								</div>
							</div>
							<div className="text-sm text-gray-500">Start a focused solo study session</div>
						</button>
					))}
				</div>
			</div>

			{/* Search Bar */}
			<div className="mb-6">
				<div className="relative max-w-md">
					<Icon
						icon="material-symbols:search"
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
					/>
					<input
						type="text"
						placeholder="Search study rooms..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
					/>
				</div>
			</div>

			{/* Study Rooms Grid */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">Available Study Rooms</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredRooms.map((room) => (
						<div key={room.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
							{/* Room Image */}
							<div className="relative h-40 bg-gray-100">
								<img
									src={room.image}
									alt={room.name}
									className="w-full h-full object-cover"
								/>

								{/* Room Stats Overlay */}
								<div className="absolute bottom-3 left-3 flex space-x-2">
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:person" className="text-sm" />
										<span>{room.participants}</span>
									</div>
									<div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
										<Icon icon="material-symbols:schedule" className="text-sm" />
										<span>{room.duration}</span>
									</div>
									{room.features.map((feature, index) => (
										<div key={index} className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
											<Icon icon={getFeatureIcon(feature)} className="text-sm" />
										</div>
									))}
								</div>
							</div>

							{/* Room Info */}
							<div className="p-4">
								<h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
								<p className="text-sm text-gray-500 mb-4">{room.type}</p>

								<button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
									<Icon icon="material-symbols:login" className="text-lg" />
									<span>Join Room</span>
								</button>
							</div>
						</div>
					))}
				</div>

				{filteredRooms.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500">No study rooms found matching your search.</p>
					</div>
				)}
			</div>
		</div>
	)
}
