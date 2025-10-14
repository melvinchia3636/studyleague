import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Home, TimerPage, Settings, About } from './pages'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
