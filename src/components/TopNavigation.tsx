import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { SettingsModal } from './SettingsModal'
import { useUser } from '../contexts/UserContext'

export const TopNavigation = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const { user, logout } = useUser()
	const navigate = useNavigate()

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

	const openSettings = () => {
		setIsSettingsOpen(true)
		setIsDropdownOpen(false)
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<>
			<nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between w-full">
				{/* Left side - Daily Goal */}
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-lg">
						<Icon icon="material-symbols:star" className="text-orange-500 text-lg" />
						<span className="text-sm font-medium text-orange-700">1 Hr 13 min to go today!</span>
					</div>
				</div>

				{/* Center - Stats */}
				<div className="flex items-center space-x-8">
					{/* Global Rank */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
							<Icon icon="material-symbols:trophy" className="text-yellow-600 text-lg" />
						</div>
						<div>
							<div className="text-sm font-bold text-gray-900">20 / 2.5k</div>
							<div className="text-xs text-gray-500">Global Rank</div>
						</div>
					</div>

					{/* This Week */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<Icon icon="material-symbols:schedule" className="text-blue-600 text-lg" />
						</div>
						<div>
							<div className="text-sm font-bold text-gray-900">50 Hr</div>
							<div className="text-xs text-gray-500">This week</div>
						</div>
					</div>

					{/* This Month */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
							<Icon icon="material-symbols:calendar-month" className="text-purple-600 text-lg" />
						</div>
						<div>
							<div className="text-sm font-bold text-gray-900">250 Hr 13 min</div>
							<div className="text-xs text-gray-500">This month</div>
						</div>
					</div>
				</div>

				{/* Right side - User Account */}
				<div className="flex items-center space-x-4">
					{/* Notifications */}
					<button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
						<Icon icon="material-symbols:notifications-outline" className="text-xl" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
					</button>

					{/* User Account Dropdown */}
					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
						>
							{/* Avatar */}
							<img
								src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"}
								alt={user?.name || "User"}
								className="w-8 h-8 rounded-full object-cover"
							/>

							{/* User Info */}
							<div className="hidden sm:block text-left">
								<p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
								<p className="text-xs text-gray-500">{user?.email || ""}</p>
							</div>

							{/* Dropdown Arrow */}
							<Icon
								icon="material-symbols:keyboard-arrow-down"
								className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<>
								{/* Backdrop */}
								<div
									className="fixed inset-0 z-10"
									onClick={() => setIsDropdownOpen(false)}
								></div>

								{/* Dropdown Content */}
								<div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-2">
									{/* User Info Header */}
									<div className="px-4 py-3 border-b border-gray-200">
										<p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
										<p className="text-xs text-gray-500">{user?.email || ""}</p>
									</div>

									{/* Menu Items */}
									<div className="py-1">
										<button
											className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
											onClick={() => setIsDropdownOpen(false)}
										>
											<Icon icon="material-symbols:person-outline" className="mr-3 text-lg" />
											Profile
										</button>

										<button
											className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
											onClick={openSettings}
										>
											<Icon icon="material-symbols:settings-outline" className="mr-3 text-lg" />
											Settings
										</button>
									</div>

									{/* Divider */}
									<div className="border-t border-gray-200 my-1"></div>

									{/* Sign Out */}
									<button
										className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
										onClick={handleLogout}
									>
										<Icon icon="material-symbols:logout" className="mr-3 text-lg" />
										Sign Out
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</nav>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</>
	)
}
