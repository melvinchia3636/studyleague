import { PROGRESS_RING } from '../constants/timer'

interface ProgressRingProps {
  progress: number // 0 to 100
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
}

export default function ProgressRing({
  progress,
  size = 400,
  strokeWidth = PROGRESS_RING.STROKE_WIDTH,
  className = '',
  children
}: ProgressRingProps) {
  const radius = 120 // Increased radius to give more space for text
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const center = size / 2

  return (
    <div className={`relative inline-block ${className}`}>
      <svg className="-rotate-90 transform" height={size} width={size}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          stroke="#1d2937" // dark gray
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className="transition-all duration-1000 ease-in-out"
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          stroke="#f97316" // orange-500
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Content in center */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
