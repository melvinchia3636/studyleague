import { useTimer } from '../../hooks/useTimer'
import { TimerProgress } from './TimerProgress'
import { TimerControls } from './TimerControls'
import { StatusIndicator } from '../ui/StatusIndicator'
import type { TimerConfig } from '../../types/timer'

interface TimerProps extends TimerConfig {
  className?: string
}

export const Timer: React.FC<TimerProps> = ({
  duration,
  onComplete,
  onTick,
  className = '',
}) => {
  const timer = useTimer({ duration, onComplete, onTick })

  return (
    <div className={`bg-gray-900 rounded-3xl shadow-2xl p-12 text-center max-w-md w-full ${className}`}>
      <h1 className="text-3xl font-bold text-gray-100 mb-12">Study Timer</h1>

      {/* Timer with Radial Progress */}
      <TimerProgress
        timeLeft={timer.timeLeft}
        totalTime={duration}
        className="mb-12"
      />

      {/* Control Buttons */}
      <TimerControls
        toggle={timer.toggle}
        reset={timer.reset}
        status={timer.status}
        className="mb-8"
      />

      {/* Status indicator */}
      <StatusIndicator status={timer.status} />
    </div>
  )
}
