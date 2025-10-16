import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { Layout } from './components'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home, TimerPage, StudyRooms, Login, About, Discussions } from './pages'
import './App.css'

function App() {
	return (
		<UserProvider>
			<Routes>
				{/* Public Routes */}
				<Route path="/login" element={<Login />} />

				{/* Protected Routes (only be shown after login) */}
				<Route path="/" element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}>
					{/*Index Route*/}
					<Route index element={<Home />} />

					{/* All other pages */}
					<Route path="timer" element={<TimerPage />} />
					<Route path="study-rooms" element={<StudyRooms />} />
					<Route path="about" element={<About />} />
					<Route path="discussions" element={<div>To Be Implemented</div>} />
					<Route path="stats" element={<div>To Be Implemented</div>} />
					<Route path="achievements" element={<div>To Be Implemented</div>} />
					<Route path="*" element={<div>Page Not Found</div>} />
				</Route>
			</Routes>
		</UserProvider>
	)
}

export default App
