import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { Icon } from '@iconify/react'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useUser()
	const location = useLocation()

	// Show loading spinner while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="flex items-center justify-center space-x-3 mb-4">
						<div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
							<Icon icon="material-symbols:school" className="text-white text-2xl" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Study</h1>
							<h1 className="text-2xl font-bold text-orange-500 -mt-1">League</h1>
						</div>
					</div>
					<div className="flex items-center justify-center space-x-2 text-gray-600">
						<Icon icon="material-symbols:progress-activity" className="animate-spin h-6 w-6 text-orange-500" />
						<span className="text-lg">Loading...</span>
					</div>
				</div>
			</div>
		)
	}

	// Redirect to login if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	// Render the protected content
	return <>{children}</>
}
