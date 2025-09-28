import { formatTime } from '../../utils/timeFormat'

interface TimerDisplayProps {
  timeLeft: number
  className?: string
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  className = '',
}) => {
  return (
    <span className={`text-4xl font-mono font-bold text-gray-100 ${className}`}>
      {formatTime(timeLeft)}
    </span>
  )
}
