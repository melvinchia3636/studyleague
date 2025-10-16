import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { TopNavigation } from './TopNavigation'

export const Layout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Fixed Top Navigation */}
			<div className="fixed top-0 left-64 right-0 z-30">
				<TopNavigation />
			</div>

			{/* Sidebar Navigation */}
			<Navigation />

			{/* Main Content Area */}
			<main className="ml-64 pt-24 min-h-screen">
				<Outlet />
			</main>
		</div>
	)
}
