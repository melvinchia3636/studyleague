// Timer types and interfaces

export interface TimerState {
  timeLeft: number
  isRunning: boolean
  isCompleted: boolean
}

export interface TimerActions {
  start: () => void
  pause: () => void
  reset: () => void
  toggle: () => void
}

export interface TimerConfig {
  duration: number // in seconds
  onComplete?: () => void
  onTick?: (timeLeft: number) => void
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'
