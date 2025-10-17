import { Icon } from '@iconify/react'

export const Discussions = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-2xl w-full text-center">
				{/* Main Icon */}
				<div className="relative mb-8">
					<div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
						<Icon icon="material-symbols:forum" className="text-6xl text-white" />
					</div>
				</div>

				{/* Main Content */}
				<div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Discussions</h1>
					<p className="text-xl text-gray-600 mb-6">
						Connect, collaborate, and learn together
					</p>

					{/* Coming Soon Badge */}
					<div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg mb-6">
						Coming Soon
					</div>

					<p className="text-gray-600 text-lg leading-relaxed mb-8">
						We're building a vibrant community space where you can ask questions,
						share study tips, and support each other's learning journey.
					</p>

					{/* Preview Features */}
					<div className="grid md:grid-cols-2 gap-6 mb-8">
						<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
							<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:help" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Q&A Forum</h3>
							<p className="text-gray-600 text-sm">Ask questions and get help from your peers</p>
						</div>

						<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
							<div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:lightbulb" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Study Tips</h3>
							<p className="text-gray-600 text-sm">Share, and discover study techniques and strategies</p>
						</div>

						<div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
							<div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:diversity-3" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Study Groups</h3>
							<p className="text-gray-600 text-sm">Form study groups and collaborate on subjects</p>
						</div>

						<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
							<div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
								<Icon icon="material-symbols:trending-up" className="text-2xl text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Trending Topics</h3>
							<p className="text-gray-600 text-sm">Stay updated with popular discussions and trending news</p>
						</div>
					</div>
				</div>

				{/* Progress Indicator */}
				<div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm font-medium text-gray-700">Development Progress</span>
						<span className="text-sm font-medium text-blue-600">60%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-3">
						<div className="bg-gradient-to-r from-blue-400 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
					</div>
					<p className="text-xs text-gray-500 mt-2">
						Discussion platform in active development
					</p>
					<button
						className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Add me to the waitlist
					</button>
				</div>
			</div>
		</div>
	)
}