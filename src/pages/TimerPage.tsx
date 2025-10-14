import { Timer } from '../components'
import { TIMER_DURATIONS } from '../constants/timer'

export const TimerPage = () => {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
            <Timer
                duration={TIMER_DURATIONS.POMODORO}
                onComplete={handleTimerComplete}
                onTick={handleTimerTick}
            />
        </div>
    )
}