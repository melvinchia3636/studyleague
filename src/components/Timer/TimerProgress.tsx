import { ProgressRing } from '../ui/ProgressRing'
import { TimerDisplay } from './TimerDisplay'

interface TimerProgressProps {
  timeLeft: number
  totalTime: number
  className?: string
}

export const TimerProgress: React.FC<TimerProgressProps> = ({
  timeLeft,
  totalTime,
  className = '',
}) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return (
    <ProgressRing progress={progress} className={className}>
      <TimerDisplay timeLeft={timeLeft} />
    </ProgressRing>
  )
}
