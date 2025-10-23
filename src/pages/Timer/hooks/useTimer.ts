import { useCallback, useEffect, useState } from 'react'

import { TIMER_CONFIG } from '../constants/timer'
import type {
  TimerActions,
  TimerConfig,
  TimerState,
  TimerStatus
} from '../typescript/timer'

interface UseTimerReturn extends TimerState, TimerActions {
  status: TimerStatus
}

export const useTimer = (config: TimerConfig): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(config.duration)
  const [isRunning, setIsRunning] = useState(false)

  const isCompleted = timeLeft === 0
  const status: TimerStatus = isCompleted
    ? 'completed'
    : isRunning
      ? 'running'
      : timeLeft === config.duration
        ? 'idle'
        : 'paused'

  // Timer effect
  useEffect(() => {
    let timerId: number | undefined

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          config.onTick?.(newTime)

          if (newTime === 0) {
            setIsRunning(false)
            config.onComplete?.()
          }

          return newTime
        })
      }, TIMER_CONFIG.TICK_INTERVAL)
    }

    return () => clearInterval(timerId)
  }, [isRunning, timeLeft, config])

  // Actions
  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true)
    }
  }, [timeLeft])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  // reset to initial duration
  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(config.duration)
  }, [config.duration])

  const toggle = useCallback(() => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }, [isRunning, start, pause])

  return {
    timeLeft,
    isRunning,
    isCompleted,
    status,
    start,
    pause,
    reset,
    toggle
  }
}
