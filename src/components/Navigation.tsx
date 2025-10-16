import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

export const Navigation = () => {
	const location = useLocation()

	const navItems = [
		{ path: '/', label: 'Dashboard', icon: 'material-symbols:dashboard' },
		{ path: '/study-rooms', label: 'Study Rooms', icon: 'material-symbols:meeting-room' },
		{ path: '/discussions', label: 'Discussions', icon: 'material-symbols:forum' },
		{ path: '/stats', label: 'Stats', icon: 'material-symbols:bar-chart' },
		{ path: '/achievements', label: 'Achievements', icon: 'material-symbols:emoji-events' },
	]

	return (
		<nav className="bg-white border-r border-gray-300 shadow-lg fixed left-0 top-0 h-full w-64 z-10">
			<div className="flex flex-col h-full p-6">
				{/* Branding */}
				<div className="mb-8 flex items-center space-x-3">
					<img src="/main_logo.svg" alt="Study League Logo" width={320} height={80} />
				</div>

				{/* Navigation Items */}
				<div className="flex flex-col space-y-2 flex-1">
					{navItems.map((item) => {
						const isActive = location.pathname === item.path ||
							(item.path === '/' && location.pathname === '/')
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${isActive
									? 'bg-orange-500 text-white shadow-lg'
									: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
									}`}
							>
								<Icon icon={item.icon} className="text-lg" />
								<span>{item.label}</span>
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}