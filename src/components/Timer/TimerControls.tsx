import { Button } from '../ui/Button'
import type { TimerStatus } from '../../types/timer'

interface TimerControlsProps {
  toggle: () => void
  reset: () => void
  status: TimerStatus
  className?: string
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  toggle,
  reset,
  status,
  className = '',
}) => {
  const isRunning = status === 'running'

  return (
    <div className={`flex justify-center space-x-8 ${className}`}>
      {/* Start/Pause Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={toggle}
          variant={isRunning ? 'danger' : 'primary'}
          icon={isRunning ? 'material-symbols:pause' : 'material-symbols:play-arrow'}
          disabled={status === 'completed'}
        />
        <span className="text-sm text-gray-300 mt-2 font-medium">
          {isRunning ? 'Pause' : 'Start'}
        </span>
      </div>

      {/* Reset Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={reset}
          variant="secondary"
          icon="material-symbols:refresh"
        />
        <span className="text-sm text-gray-300 mt-2 font-medium">
          Reset
        </span>
      </div>
    </div>
  )
}
