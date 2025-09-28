import { Timer } from './components'
import { TIMER_DURATIONS } from './constants/timer'
import './App.css'

function App() {
  const handleTimerComplete = () => {
    // You can add notification logic here
    console.log('Timer completed!')
  }

  const handleTimerTick = (timeLeft: number) => {
    // You can add progress tracking logic here
    if (timeLeft <= 10 && timeLeft > 0) {
      console.log(`Only ${timeLeft} seconds left!`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <Timer
        duration={TIMER_DURATIONS.POMODORO}
        onComplete={handleTimerComplete}
        onTick={handleTimerTick}
      />
    </div>
  )
}

export default App
