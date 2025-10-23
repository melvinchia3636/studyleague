import ProgressRing from './ProgressRing'

interface TimerProgressProps {
  timeLeft: number
  totalTime: number
  className?: string
}

export default function TimerProgress({
  timeLeft,
  totalTime,
  className = ''
}: TimerProgressProps) {
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return <ProgressRing className={className} progress={progress} />
}
