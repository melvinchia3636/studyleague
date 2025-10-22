import React from 'react'
import { Icon } from '@iconify/react'

function Hero() {
	return (
		<div className="hidden lg:flex lg:w-1/2 relative">
			<img
				src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
				alt="Students studying together"
				className="w-full h-full object-cover"
			/>

			{/* Overlay with gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-orange-800/80 via-orange-700/60 to-transparent"></div>

			{/* Content overlay */}
			<div className="absolute inset-0 flex flex-col justify-center items-start p-12 text-white">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold mb-6 leading-tight">
						Welcome to Study League
					</h1>
					<p className="text-xl mb-8 text-white/90 leading-relaxed">
						Join thousands of students in focused study sessions. Track your progress,
						stay motivated, and achieve your academic goals together.
					</p>
					<div className="flex items-center space-x-6">
						<div className="flex items-center space-x-2">
							<Icon icon="material-symbols:group" className="text-2xl" />
							<span className="font-medium">50k+ Students</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon icon="material-symbols:timer" className="text-2xl" />
							<span className="font-medium">1M+ Study Hours</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero