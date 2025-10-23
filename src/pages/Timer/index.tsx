import Timer from './components/Timer'
import { TIMER_DURATIONS } from './constants/timer'

export default function TimerPage() {
  const handleTimerComplete = () => {
    // Notification logic (to be implemented)
    console.log('Timer completed!')
  }

  const handleTimerTick = (timeLeft: number) => {
    // Tick logic (to be implemented)
    if (timeLeft <= 10 && timeLeft > 0) {
      console.log(`${timeLeft} seconds left`)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 p-8">
      <Timer
        duration={TIMER_DURATIONS.POMODORO}
        onComplete={handleTimerComplete}
        onTick={handleTimerTick}
      />
    </div>
  )
}
