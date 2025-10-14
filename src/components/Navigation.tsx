import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

export const Navigation = () => {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Home', icon: 'material-symbols:home' },
        { path: '/timer', label: 'Timer', icon: 'material-symbols:timer' },
        { path: '/settings', label: 'Settings', icon: 'material-symbols:settings' },
        { path: '/about', label: 'About', icon: 'material-symbols:info' },
    ]

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-white">
                            Study League
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <span><Icon icon={item.icon} /></span>
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}