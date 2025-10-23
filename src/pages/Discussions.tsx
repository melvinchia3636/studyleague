import { Icon } from '@iconify/react'

export default function Discussions() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-100 p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Main Icon */}
        <div className="relative mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-indigo-600 shadow-2xl">
            <Icon
              className="text-6xl text-white"
              icon="material-symbols:forum"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Discussions</h1>
          <p className="mb-6 text-xl text-gray-600">
            Connect, collaborate, and learn together
          </p>

          {/* Coming Soon Badge */}
          <div className="mb-6 inline-flex items-center rounded-full bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg">
            Coming Soon
          </div>

          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            We&apos;re building a vibrant community space where you can ask
            questions, share study tips, and support each other&apos;s learning
            journey.
          </p>

          {/* Preview Features */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:help"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Q&A Forum</h3>
              <p className="text-sm text-gray-600">
                Ask questions and get help from your peers
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-linear-to-br from-green-50 to-green-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:lightbulb"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Study Tips</h3>
              <p className="text-sm text-gray-600">
                Share, and discover study techniques and strategies
              </p>
            </div>

            <div className="rounded-xl border border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:diversity-3"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Study Groups</h3>
              <p className="text-sm text-gray-600">
                Form study groups and collaborate on subjects
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:trending-up"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Trending Topics
              </h3>
              <p className="text-sm text-gray-600">
                Stay updated with popular discussions and trending news
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Development Progress
            </span>
            <span className="text-sm font-medium text-blue-600">60%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-linear-to-r from-blue-400 to-indigo-600 transition-all duration-1000 ease-out"
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Discussion platform in active development
          </p>
          <button className="mt-4 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-400 focus:outline-none">
            Add me to the waitlist
          </button>
        </div>
      </div>
    </div>
  )
}
