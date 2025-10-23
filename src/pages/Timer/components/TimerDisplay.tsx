import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface TimerDisplayProps {
  timeLeft: number
  className?: string
}

export default function TimerDisplay({
  timeLeft,
  className = ''
}: TimerDisplayProps) {
  return (
    <span className={`font-mono text-4xl font-bold text-gray-100 ${className}`}>
      {dayjs.duration(timeLeft, 'seconds').format('mm:ss')}
    </span>
  )
}
