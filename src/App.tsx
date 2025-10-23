import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './contexts/UserContext'
import {
  About,
  Achievements,
  Discussions,
  Home,
  Login,
  Stats,
  StudyRooms,
  TimerPage
} from './pages'

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<Login />} path="/login" />

        {/* Protected Routes (only be shown after login) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
          path="/"
        >
          {/*Index Route*/}
          <Route index element={<Home />} />

          {/* All other pages */}
          <Route element={<TimerPage />} path="timer" />
          <Route element={<StudyRooms />} path="study-rooms" />
          <Route element={<About />} path="about" />
          <Route element={<Discussions />} path="discussions" />
          <Route element={<Stats />} path="stats" />
          <Route element={<Achievements />} path="achievements" />
          <Route element={<div>Page Not Found</div>} path="*" />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
