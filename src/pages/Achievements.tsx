import { Icon } from '@iconify/react'
import { useAchievements, useUserAchievements } from '../hooks/useAchievements'
import { useUser } from '../contexts/UserContext'

export const Achievements = () => {
	const { user } = useUser()
	const { achievements, loading: achievementsLoading, error: achievementsError } = useAchievements()
	const { userAchievements, loading: userAchievementsLoading, error: userAchievementsError } = useUserAchievements(user?.id || null)
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
			<div className="max-w-2xl w-full text-center">
				{/* Main Icon */}
				<div className="relative mb-8">
					<div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
						<Icon icon="material-symbols:trophy" className="text-6xl text-white" />
					</div>

					{/* Floating Achievement Badges */}
					<div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
						<Icon icon="material-symbols:star" className="text-2xl text-white" />
					</div>
					<div className="absolute -top-2 -right-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
						<Icon icon="material-symbols:military-tech" className="text-xl text-white" />
					</div>
					<div className="absolute -bottom-2 -left-6 w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
						<Icon icon="material-symbols:workspace-premium" className="text-xl text-white" />
					</div>
				</div>

				{/* Main Content */}
				<div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						🏆 Achievements
					</h1>
					<p className="text-xl text-gray-600 mb-6">
						Your journey to greatness starts here
					</p>

					{/* Coming Soon Badge */}
					<div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg mb-6">
						<Icon icon="material-symbols:rocket-launch" className="mr-3 text-2xl" />
						Coming Soon
					</div>

					<p className="text-gray-600 text-lg leading-relaxed mb-8">
						We're crafting an amazing achievement system that will recognize your dedication,
						celebrate your milestones, and unlock exciting rewards as you progress in your studies.
					</p>

					{/* Preview Features */}
					<div className="grid md:grid-cols-2 gap-6 mb-8">
						<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
							<div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:timer" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Study Streaks</h3>
							<p className="text-gray-600 text-sm">Track consecutive days of studying and unlock streak achievements</p>
						</div>

						<div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
							<div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:target" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Study Goals</h3>
							<p className="text-gray-600 text-sm">Complete daily, weekly, and monthly study goals</p>
						</div>

						<div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
							<div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:leaderboard" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Leaderboard Ranks</h3>
							<p className="text-gray-600 text-sm">Earn badges for reaching top positions in the leaderboard</p>
						</div>

						<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
							<div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:psychology" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Focus Master</h3>
							<p className="text-gray-600 text-sm">Unlock achievements for maintaining long focus sessions</p>
						</div>
					</div>
				</div>

				{/* Progress Indicator */}
				<div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm font-medium text-gray-700">Development Progress</span>
						<span className="text-sm font-medium text-orange-600">10%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-3">
						<div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '10%' }}></div>
					</div>
					<p className="text-xs text-gray-500 mt-2">
						Achievement system in active development
					</p>
				</div>
			</div>
		</div>
	)
}
