import { Icon } from '@iconify/react'

import { useTimer } from '../hooks/useTimer'
import type { TimerConfig } from '../typescript/timer'
import TimerControls from './TimerControls'
import TimerProgress from './TimerProgress'

interface TimerProps extends TimerConfig {
  className?: string
  onExit?: () => void
}

export default function Timer({
  duration,
  onComplete,
  onTick,
  onExit,
  className = ''
}: TimerProps) {
  const timer = useTimer({ duration, onComplete, onTick })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const totalMinutes = Math.floor(duration / 60)
  const currentSession =
    timer.status === 'completed'
      ? totalMinutes
      : Math.ceil((duration - timer.timeLeft) / 60)

  const handleExit = () => {
    if (onExit) {
      onExit()
    }
  }

  // Get current time and date
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  const currentDate = now.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  })

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 ${className}`}
    >
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <Icon
              className="text-lg text-white"
              icon="material-symbols:school"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Study League</h1>
        </div>
        <h2 className="mb-2 text-4xl font-bold text-white">Solo Study</h2>
      </div>

      {/* Timer Circle */}
      <div className="relative mb-12">
        <TimerProgress
          className="mb-0"
          timeLeft={timer.timeLeft}
          totalTime={duration}
        />

        {/* Timer Display in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-2 text-6xl font-bold text-white">
            {formatTime(timer.timeLeft)}
          </div>
          <div className="text-lg font-medium text-gray-400">Study</div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 flex items-center space-x-8 text-gray-300">
        <div className="flex items-center space-x-2">
          <Icon
            className="text-lg text-orange-500"
            icon="material-symbols:timer"
          />
          <span className="text-sm font-medium">
            {currentSession}/{totalMinutes} MINS
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon
            className="text-lg text-orange-500"
            icon="material-symbols:refresh"
          />
          <span className="text-sm font-medium">2/5</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8">
        <h3 className="mb-6 text-center text-lg font-semibold text-white">
          MORE ACTIONS
        </h3>
        <div className="flex items-center space-x-4">
          {/* Music Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:music-note"
            />
          </button>

          {/* Skip to Rest Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:skip-next"
            />
          </button>

          {/* Change Timing Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:schedule"
            />
          </button>

          {/* Exit Button */}
          <button
            className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-600 transition-colors hover:bg-red-700"
            onClick={handleExit}
          >
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:logout"
            />
          </button>
        </div>
      </div>

      {/* Main Control Buttons */}
      <TimerControls
        className="mb-0"
        reset={timer.reset}
        status={timer.status}
        toggle={timer.toggle}
      />

      {/* Top right info */}
      <div className="absolute top-8 right-8 text-right">
        <div className="mb-1 text-2xl font-bold text-white">{currentTime}</div>
        <div className="mb-4 text-sm text-gray-400">{currentDate}</div>
        <div className="space-y-2">
          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
            <Icon className="text-lg" icon="material-symbols:music-note" />
            <span>Never Gonna Give You Up - Rick Astley</span>
          </div>
          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
            <Icon className="text-lg" icon="material-symbols:location-on" />
            <span>Library - McKinnon Way</span>
          </div>
        </div>
      </div>
    </div>
  )
}
