import { Icon } from '@iconify/react'
import { useState } from 'react'

import { useUser } from '../contexts/UserContext'
import { useStudySessions } from '../hooks/useStudySessions'
import { useStudyTargets } from '../hooks/useStudyTargets'
import Timer from './Timer/components/Timer'
import { TIMER_DURATIONS } from './Timer/constants/timer'

export default function Home() {
  const [showTimer, setShowTimer] = useState(false)
  const { user } = useUser()
  const { sessions, createSession } = useStudySessions()
  const { targets } = useStudyTargets()

  // Calculate today's study time from sessions
  const todayStudyTime = sessions
    .filter(session => {
      const sessionDate = new Date(session.startedAt).toDateString()
      const today = new Date().toDateString()
      return sessionDate === today && !session.active
    })
    .reduce((total, session) => total + session.durationMinutes, 0)

  // Get user's weekly target
  const userTarget = targets.find(target => target.user === user?.id)
  const weeklyTargetHours = userTarget?.weeklyTarget || 40 // Default 40 hours
  const weeklyTargetMinutes = weeklyTargetHours * 60

  // Calculate this week's total study time
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const thisWeekStudyTime = sessions
    .filter(session => {
      const sessionDate = new Date(session.startedAt)
      return sessionDate >= weekStart && !session.active
    })
    .reduce((total, session) => total + session.durationMinutes, 0)

  const remainingWeeklyMinutes = Math.max(
    0,
    weeklyTargetMinutes - thisWeekStudyTime
  )

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}m`
    return `${hours}.${Math.floor((mins / 60) * 10)}h`
  }

  const handleStartStudying = () => {
    setShowTimer(true)
  }

  const handleTimerComplete = async () => {
    // Handle timer completion - create a study session record
    console.log('Timer completed!')

    if (user) {
      try {
        await createSession({
          user: user.id,
          durationMinutes: Math.floor(TIMER_DURATIONS.POMODORO / 60), // Convert seconds to minutes
          active: false,
          startedAt: new Date(
            Date.now() - TIMER_DURATIONS.POMODORO * 1000
          ).toISOString(),
          endedAt: new Date().toISOString(),
          integrityScore: 100 // Assume full completion for now
        })
      } catch (error) {
        console.error('Failed to save study session:', error)
      }
    }

    setShowTimer(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Timer Modal */}
      {showTimer && (
        <div className="fixed inset-0 z-50">
          <Timer
            className="!min-h-screen !w-full !bg-linear-to-br !from-gray-900 !via-gray-800 !to-gray-900"
            duration={TIMER_DURATIONS.POMODORO}
            onComplete={handleTimerComplete}
            onExit={() => setShowTimer(false)}
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today Stats Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-400 to-orange-500 p-8 text-white lg:col-span-2">
          <div className="relative z-10">
            <div className="mb-2 text-sm font-medium">Today Stats</div>
            <div className="mb-4 text-5xl font-bold">
              {formatTime(todayStudyTime)}
            </div>
            <div className="mb-6 text-sm">
              <div>
                &quot;Focus is not about ignoring everything else, it&apos;s
                about paying attention to what matters.&quot;
              </div>
              <div className="text-orange-200">--- Anonymous</div>
            </div>
            <button
              className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-medium text-orange-500 transition-colors hover:bg-gray-50"
              onClick={handleStartStudying}
            >
              <Icon className="text-lg" icon="material-symbols:play-arrow" />
              <span>Start Studying</span>
            </button>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 h-64 w-64 opacity-20">
            <div className="h-full w-full translate-x-16 -translate-y-16 transform rounded-full bg-linear-to-br from-white to-transparent"></div>
          </div>
        </div>
        {/* Weekly Goals Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 p-6 text-white">
          <div className="relative z-10 flex h-full flex-col">
            <div className="grow">
              <div className="mb-2 text-sm font-medium">Your Weekly Goals</div>
              <div className="mb-2 text-4xl font-bold">
                {formatTime(remainingWeeklyMinutes)}
              </div>
              <div className="mb-6 text-sm text-indigo-200">Remaining</div>
            </div>
            <button
              className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-medium text-indigo-600 transition-colors hover:bg-gray-50"
              onClick={handleStartStudying}
            >
              <Icon className="text-lg" icon="material-symbols:play-arrow" />
              <span>Adjust your Target</span>
            </button>
          </div>
        </div>
      </div>

      {/* Study Rooms Section */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Explore Open Study Rooms
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Room Image */}
              <div className="relative h-40 bg-gray-100">
                <img
                  alt="Study Room"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                />

                {/* Room Stats Overlay */}
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    <Icon className="text-sm" icon="material-symbols:person" />
                    <span>50</span>
                  </div>
                  <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    <Icon
                      className="text-sm"
                      icon="material-symbols:schedule"
                    />
                    <span>25m</span>
                  </div>
                  <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    <Icon
                      className="text-sm"
                      icon="material-symbols:volume-off"
                    />
                  </div>
                  <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    <Icon
                      className="text-sm"
                      icon="material-symbols:videocam"
                    />
                  </div>
                  <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    <Icon className="text-sm" icon="material-symbols:chat" />
                  </div>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-gray-900">
                  Focus Room (25 mins)
                </h3>
                <p className="mb-4 text-sm text-gray-500">Public Room</p>

                <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600">
                  <Icon
                    className="text-lg"
                    icon="material-symbols:play-arrow"
                  />
                  <span>Start Studying</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
