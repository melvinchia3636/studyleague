import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import TopNavigation from './TopNavigation'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 right-0 left-64 z-30">
        <TopNavigation />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen pt-24">
        <Outlet />
      </main>
    </div>
  )
}
