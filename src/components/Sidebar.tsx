import { Icon } from '@iconify/react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'material-symbols:dashboard' },
    {
      path: '/study-rooms',
      label: 'Study Rooms',
      icon: 'material-symbols:meeting-room'
    },
    {
      path: '/discussions',
      label: 'Discussions',
      icon: 'material-symbols:forum'
    },
    { path: '/stats', label: 'Stats', icon: 'material-symbols:bar-chart' },
    {
      path: '/achievements',
      label: 'Achievements',
      icon: 'material-symbols:emoji-events'
    }
  ]

  return (
    <nav className="fixed top-0 left-0 z-10 h-full w-64 border-r border-gray-300 bg-white shadow-lg">
      <div className="flex h-full flex-col p-6">
        {/* Branding */}
        <div className="mb-8 flex items-center space-x-3">
          <img
            alt="Study League Logo"
            height={80}
            src="/main_logo.svg"
            width={320}
          />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 flex-col space-y-2">
          {navItems.map(item => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/')
            return (
              <Link
                key={item.path}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                to={item.path}
              >
                <Icon className="text-lg" icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
