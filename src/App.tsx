import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { Layout } from './components'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home, TimerPage, StudyRooms, Stats, Login, About, Discussions, Achievements } from './pages'
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
					<Route path="discussions" element={<Discussions />} />
					<Route path="stats" element={<Stats />} />
					<Route path="achievements" element={<Achievements />} />
					<Route path="*" element={<div>Page Not Found</div>} />
				</Route>
			</Routes>
		</UserProvider>
	)
}

export default App
