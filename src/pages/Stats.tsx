import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useUser } from '../contexts/UserContext'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { POCKETBASE_URL } from '../constants/server'

export const Stats = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('day')
	const { user } = useUser()
	const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = useLeaderboard()

	// Mock data for charts and statistics (to be replaced with real API data)
	const performanceData = {
		today: { minutes: 166, change: '+16% More than Yesterday' },
		thisWeek: { minutes: 166, change: '+16% More than Yesterday' },
		thisMonth: { minutes: 166, change: '+16% More than Yesterday' }
	}

	const dailyMetrics = [
		{ label: 'Average Duration', value: '2 Hr 0 Min', trend: '', color: 'text-green-600' },
		{ label: 'Total Sessions', value: '1,218', trend: '', color: 'text-green-600' },
		{ label: 'Current Streak', value: '10,317', trend: '', color: 'text-green-600' },
		{ label: 'Best Streak', value: '5,140', trend: '', color: 'text-green-600' }
	]

	const timeData = [
		{ device: 'Work Time', percentage: 67, color: 'bg-purple-400' },
		{ device: 'Off-work Time', percentage: 26, color: 'bg-green-400' },
		{ device: 'Weekdays', percentage: 7, color: 'bg-orange-400' },
		{ device: 'Weekends', percentage: 7, color: 'bg-blue-400' }
	]


	// Transform API leaderboard data for the UI
	const transformLeaderboardData = () => {
		if (!leaderboard || leaderboard.length === 0) {
			return []
		}

		return leaderboard.map((entry, index) => ({
			rank: index + 1,
			id: entry.user_id,
			name: entry.user_name,
			avatar: `${POCKETBASE_URL}/api/files/users/${entry.user_id}/${entry.user_avatar}`,
			durations: {
				day: entry.dayTotal || 0,
				week: entry.dayTotal * 7 || 0, // Approximate weekly total
				month: entry.monthTotal || 0
			}
		}))
	}

	const leaderboardData = transformLeaderboardData()

	// Find current user's position in leaderboard
	const currentUserPosition = leaderboard ? leaderboard.findIndex(entry => entry.user_id === user?.id) : -1
	const currentUserRank = currentUserPosition >= 0 ? currentUserPosition + 1 : 45 // Default to 45 if not found

	// Current user data
	const currentUserData = currentUserPosition >= 0 ? {
		rank: currentUserRank,
		id: user?.id || '',
		name: user?.name || 'You',
		avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
		durations: {
			day: leaderboard[currentUserPosition].dayTotal || 166,
			week: leaderboard[currentUserPosition].dayTotal * 7 || 1162,
			month: leaderboard[currentUserPosition].monthTotal || 4648
		}
	} : {
		rank: currentUserRank,
		id: user?.id || '',
		name: user?.name || 'You',
		avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
		durations: {
			day: 166,
			week: 1162,
			month: 4648
		}
	}

	// Check if current user is in top 30
	const isUserInTop30 = currentUserRank <= 30

	const formatDuration = (minutes: number) => {
		const hours = Math.floor(minutes / 60)
		const mins = minutes % 60
		if (hours === 0) return `${mins}m`
		return `${hours}h ${mins}m`
	}

	const getPeriodLabel = () => {
		switch (selectedPeriod) {
			case 'day': return 'Today'
			case 'week': return 'This Week'
			case 'month': return 'This Month'
			default: return 'Today'
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Stats</h1>
				<p className="text-gray-600">Your Overall Performance in a Glance</p>
			</div>

			{/* Performance Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<h3 className="text-sm font-medium text-gray-500 mb-2">Today</h3>
					<div className="text-3xl font-bold text-gray-900 mb-2">166 Mins</div>
					<div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
						+16% More than Yesterday
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<h3 className="text-sm font-medium text-gray-500 mb-2">This Week</h3>
					<div className="text-3xl font-bold text-gray-900 mb-2">166 Mins</div>
					<div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
						+16% More than Yesterday
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<h3 className="text-sm font-medium text-gray-500 mb-2">This Month</h3>
					<div className="text-3xl font-bold text-gray-900 mb-2">166 Mins</div>
					<div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
						+16% More than Yesterday
					</div>
				</div>
			</div>

			{/* Charts Row */}

			{/* Bottom Row - Audience Metrics and Device Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Audience Metrics */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Daily Metrics</h3>
						<button className="text-gray-400 hover:text-gray-600">
							<Icon icon="material-symbols:more-horiz" className="text-xl" />
						</button>
					</div>

					{/* Metrics Grid */}
					<div className="grid grid-cols-2 gap-6 mb-6">
						{dailyMetrics.map((metric, index) => (
							<div key={index} className="text-center">
								<div className="text-2xl font-bold text-gray-900 mb-1">
									{metric.value}
									<span className={`text-sm font-normal ml-2 ${metric.color}`}>
										{metric.trend}
									</span>
								</div>
								<div className="text-sm text-gray-500">{metric.label}</div>
							</div>
						))}
					</div>

					{/* Chart Area */}
					<div className="h-32 bg-gray-50 rounded-lg flex items-end justify-center space-x-1 p-4">
						{/* Mock bar chart */}
						{Array.from({ length: 30 }, (_, i) => (
							<div
								key={i}
								className="bg-orange-400 rounded-t"
								style={{
									height: `${Math.random() * 80 + 20}%`,
									width: '6px'
								}}
							/>
						))}
					</div>
				</div>

				{/* Analytics by Device Type */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Analytics by Time</h3>
						<button className="text-gray-400 hover:text-gray-600">
							<Icon icon="material-symbols:more-horiz" className="text-xl" />
						</button>
					</div>

					{/* Device Breakdown */}
					<div className="space-y-4">
						{timeData.map((device, index) => (
							<div key={index} className="space-y-2">
								<div className="flex justify-between items-center">
									<span className="text-sm font-medium text-gray-700">{device.device}</span>
									<span className="text-sm font-bold text-gray-900">{device.percentage}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className={`${device.color} h-2 rounded-full transition-all duration-300`}
										style={{ width: `${device.percentage}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Leaderboard Section */}
			<div className="mt-8">
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
							<p className="text-sm text-gray-500">Top performers in the Study League</p>
						</div>

						{/* Period Selector */}
						<div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
							{['day', 'week', 'month'].map((period) => (
								<button
									key={period}
									onClick={() => setSelectedPeriod(period)}
									className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${selectedPeriod === period
										? 'bg-white text-orange-600 shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
										}`}
								>
									{period.charAt(0).toUpperCase() + period.slice(1)}
								</button>
							))}
						</div>
					</div>

					{/* Leaderboard Table */}
					<div className="overflow-x-auto">
						{leaderboardLoading ? (
							<div className="flex items-center justify-center py-12">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
								<span className="ml-3 text-gray-600">Loading leaderboard...</span>
							</div>
						) : leaderboardError ? (
							<div className="text-center py-12">
								<Icon icon="material-symbols:error" className="text-4xl text-red-500 mb-4 mx-auto" />
								<p className="text-red-600 mb-4">{leaderboardError}</p>
								<button
									className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
									onClick={() => window.location.reload()}
								>
									Try Again
								</button>
							</div>
						) : leaderboardData.length === 0 ? (
							<div className="text-center py-12">
								<Icon icon="material-symbols:leaderboard" className="text-4xl text-gray-400 mb-4 mx-auto" />
								<p className="text-gray-600">No leaderboard data available yet</p>
								<p className="text-sm text-gray-500 mt-2">Start studying to see your ranking!</p>
							</div>
						) : (
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Rank</th>
										<th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Student</th>
										<th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">{getPeriodLabel()}</th>
									</tr>
								</thead>
								<tbody>
									{/* Top 30 Users */}
									{leaderboardData.map((leaderboardUser) => {
										const isCurrentUser = leaderboardUser.user_name === user?.name
										console.log('Rendering user:', leaderboardUser)
										return (
											<tr
												key={leaderboardUser.rank}
												className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${isCurrentUser ? 'bg-orange-50 border-orange-200' : ''
													}`}
											>
												<td className="py-3 px-4">
													<div className="flex items-center space-x-2">
														<span className={`text-sm font-bold ${isCurrentUser ? 'text-orange-600' : 'text-gray-900'
															}`}>
															#{leaderboardUser.rank}
														</span>
														{leaderboardUser.rank <= 3 && (
															<Icon
																icon={leaderboardUser.rank === 1 ? "material-symbols:trophy" :
																	leaderboardUser.rank === 2 ? "material-symbols:workspace-premium" :
																		"material-symbols:military-tech"}
																className={`text-lg ${leaderboardUser.rank === 1 ? 'text-yellow-500' :
																	leaderboardUser.rank === 2 ? 'text-gray-400' :
																		'text-orange-600'
																	}`}
															/>
														)}
													</div>
												</td>
												<td className="py-3 px-4">
													<div className="flex items-center space-x-3">
														{leaderboardUser.avatar !== "" ? (
															<img
																src={leaderboardUser.avatar}
																alt={leaderboardUser.name}
																className="w-8 h-8 rounded-full object-cover"
															/>
														) : (
															<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
																<Icon icon="material-symbols:person" className="text-gray-400" />
															</div>
														)}
														<span className={`font-medium ${isCurrentUser ? 'text-orange-900' : 'text-gray-900'
															}`}>

															{leaderboardUser.name}
															{isCurrentUser && (
																<span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
																	You
																</span>
															)}
														</span>
													</div>
												</td>
												<td className="py-3 px-4">
													<span className={`font-medium ${isCurrentUser ? 'text-orange-600' : 'text-gray-900'
														}`}>
														{formatDuration(leaderboardUser.durations[selectedPeriod as keyof typeof leaderboardUser.durations])}
													</span>
												</td>
											</tr>
										)
									})}

									{/* Current User (if not in top 30) */}
									{!isUserInTop30 && (
										<>
											{/* Separator */}
											<tr>
												<td colSpan={3} className="py-2">
													<div className="flex items-center space-x-4">
														<div className="flex-1 border-t border-gray-300"></div>
														<span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
															Your Position
														</span>
														<div className="flex-1 border-t border-gray-300"></div>
													</div>
												</td>
											</tr>

											{/* Current User Row */}
											<tr className="bg-orange-50 border-2 border-orange-200 hover:bg-orange-100 transition-colors">
												<td className="py-3 px-4">
													<span className="text-sm font-bold text-orange-600">
														#{currentUserRank}
													</span>
												</td>
												<td className="py-3 px-4">
													<div className="flex items-center space-x-3">
														<img
															src={currentUserData.avatar}
															alt={currentUserData.name}
															className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-300"
														/>
														<span className="font-medium text-orange-900">
															{currentUserData.name}
															<span className="ml-2 text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
																You
															</span>
														</span>
													</div>
												</td>
												<td className="py-3 px-4">
													<span className="font-medium text-orange-600">
														{formatDuration(currentUserData.durations[selectedPeriod as keyof typeof currentUserData.durations])}
													</span>
												</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						)}
					</div>

					{/* Leaderboard Footer */}
					<div className="mt-6 pt-4 border-t border-gray-200">
						<div className="flex items-center justify-between text-sm text-gray-500">
							<span>Showing top 30 students</span>
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Icon icon="material-symbols:trophy" className="text-yellow-500" />
									<span>1st Place</span>
								</div>
								<div className="flex items-center space-x-2">
									<Icon icon="material-symbols:workspace-premium" className="text-gray-400" />
									<span>2nd Place</span>
								</div>
								<div className="flex items-center space-x-2">
									<Icon icon="material-symbols:military-tech" className="text-orange-600" />
									<span>3rd Place</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
