import { Icon } from '@iconify/react'
import { useState } from 'react'

import { POCKETBASE_URL } from '../constants/server'
import { useStudyRooms } from '../hooks/useStudyRooms'
import Timer from './Timer/components/Timer'
import { TIMER_DURATIONS } from './Timer/constants/timer'

export default function StudyRooms() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSoloTimer, setShowSoloTimer] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(
    TIMER_DURATIONS.POMODORO
  )
  const { rooms, loading: roomsLoading, error: roomsError } = useStudyRooms()

  const soloStudyOptions = [
    {
      name: 'Pomodoro (25 min)',
      duration: TIMER_DURATIONS.POMODORO,
      icon: 'material-symbols:timer'
    },
    {
      name: 'Short Session (15 min)',
      duration: 900,
      icon: 'material-symbols:schedule'
    },
    {
      name: 'Long Session (50 min)',
      duration: 3000,
      icon: 'material-symbols:hourglass-full'
    },
    { name: 'Custom Timer', duration: 0, icon: 'material-symbols:edit' }
  ]

  // Transform API rooms data for the UI
  const transformedRooms = rooms.map(room => ({
    id: parseInt(room.id),
    name: room.room_name,
    type: room.isPublic ? 'Public Room' : 'Private Room',
    participants: `${room.participants}/${room.max_participants}`, // Mock participant count for now
    duration: `${room.timing}m`, // Default duration for now
    features: ['chat', 'video'], // Default features for now
    image: room.thumbnail
      ? `${POCKETBASE_URL}/api/files/study_rooms/${room.id}/${room.thumbnail}`
      : 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    maxParticipants: room.maxParticipants,
    host: room.host
  }))

  const filteredRooms = transformedRooms.filter(
    room =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'silent':
        return 'material-symbols:volume-off'
      case 'video':
        return 'material-symbols:videocam'
      case 'chat':
        return 'material-symbols:chat'
      case 'voice':
        return 'material-symbols:mic'
      case 'screen-share':
        return 'material-symbols:screen-share'
      default:
        return 'material-symbols:check'
    }
  }

  const handleSoloStudy = (duration: number) => {
    setSelectedDuration(duration)
    setShowSoloTimer(true)
  }

  const handleTimerComplete = () => {
    console.log('Solo study session completed!')
    setShowSoloTimer(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Solo Timer Modal */}
      {showSoloTimer && (
        <div className="fixed inset-0 z-50">
          <Timer
            className="min-h-screen! w-full! bg-linear-to-br! from-gray-900! via-gray-800! to-gray-900!"
            duration={selectedDuration}
            onComplete={handleTimerComplete}
            onExit={() => setShowSoloTimer(false)}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Study Rooms</h1>
        <p className="text-gray-600">
          Join a study room or start a solo session
        </p>
      </div>

      {/* Solo Study Options */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Solo Study</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {soloStudyOptions.map((option, index) => (
            <button
              key={index}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-lg"
              onClick={() =>
                option.duration > 0 && handleSoloStudy(option.duration)
              }
            >
              <div className="mb-3 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 transition-colors group-hover:bg-orange-200">
                  <Icon
                    className="text-xl text-orange-600"
                    icon={option.icon}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{option.name}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Start a focused solo study session
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Icon
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-lg text-gray-400"
            icon="material-symbols:search"
          />
          <input
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Search study rooms..."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Study Rooms Grid */}
      <div className="mb-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Available Study Rooms
        </h2>

        {roomsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-600">Loading study rooms...</span>
          </div>
        ) : roomsError ? (
          <div className="py-12 text-center">
            <Icon
              className="mx-auto mb-4 text-4xl text-red-500"
              icon="material-symbols:error"
            />
            <p className="mb-4 text-red-600">{roomsError}</p>
            <button
              className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="py-12 text-center">
            <Icon
              className="mx-auto mb-4 text-4xl text-gray-400"
              icon="material-symbols:meeting-room"
            />
            <p className="text-gray-600">No study rooms found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or create a new room!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map(room => (
              <div
                key={room.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                {/* Room Image */}
                <div className="relative h-40 bg-gray-100">
                  <img
                    alt={room.name}
                    className="h-full w-full object-cover"
                    src={room.image}
                  />

                  {/* Room Stats Overlay */}
                  <div className="absolute bottom-3 left-3 flex space-x-2">
                    <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      <Icon
                        className="text-sm"
                        icon="material-symbols:person"
                      />
                      <span>{room.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      <Icon
                        className="text-sm"
                        icon="material-symbols:schedule"
                      />
                      <span>{room.duration}</span>
                    </div>
                    {room.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded bg-black/70 px-2 py-1 text-xs text-white"
                      >
                        <Icon
                          className="text-sm"
                          icon={getFeatureIcon(feature)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Info */}
                <div className="p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {room.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-500">{room.type}</p>

                  <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600">
                    <Icon className="text-lg" icon="material-symbols:login" />
                    <span>Join Room</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
