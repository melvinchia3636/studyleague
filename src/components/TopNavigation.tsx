import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'
import SettingsModal from './SettingsModal'

export default function TopNavigation() {
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
      <nav className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        {/* Left side - Daily Goal */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 rounded-lg bg-orange-100 px-4 py-2">
            <Icon
              className="text-lg text-orange-500"
              icon="material-symbols:star"
            />
            <span className="text-sm font-medium text-orange-700">
              1 Hr 13 min to go today!
            </span>
          </div>
        </div>

        {/* Center - Stats */}
        <div className="flex items-center space-x-8">
          {/* Global Rank */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <Icon
                className="text-lg text-yellow-600"
                icon="material-symbols:trophy"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">20 / 2.5k</div>
              <div className="text-xs text-gray-500">Global Rank</div>
            </div>
          </div>

          {/* This Week */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Icon
                className="text-lg text-blue-600"
                icon="material-symbols:schedule"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">50 Hr</div>
              <div className="text-xs text-gray-500">This week</div>
            </div>
          </div>

          {/* This Month */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <Icon
                className="text-lg text-purple-600"
                icon="material-symbols:calendar-month"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                250 Hr 13 min
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
        </div>

        {/* Right side - User Account */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <Icon
              className="text-xl"
              icon="material-symbols:notifications-outline"
            />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500"></span>
          </button>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              {/* Avatar */}
              <img
                alt={user?.name || 'User'}
                className="h-8 w-8 rounded-full object-cover"
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
                }
              />

              {/* User Info */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email || ''}</p>
              </div>

              {/* Dropdown Arrow */}
              <Icon
                className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                icon="material-symbols:keyboard-arrow-down"
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
                <div className="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Icon
                        className="mr-3 text-lg"
                        icon="material-symbols:person-outline"
                      />
                      Profile
                    </button>

                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={openSettings}
                    >
                      <Icon
                        className="mr-3 text-lg"
                        icon="material-symbols:settings-outline"
                      />
                      Settings
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="my-1 border-t border-gray-200"></div>

                  {/* Sign Out */}
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <Icon
                      className="mr-3 text-lg"
                      icon="material-symbols:logout"
                    />
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
