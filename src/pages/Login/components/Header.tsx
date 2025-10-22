import React from 'react'
import { Icon } from '@iconify/react'

function Header() {
	return (
		<div className="text-center">
			<div className="flex items-center justify-center space-x-3 mb-4">
				<div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
					<Icon icon="material-symbols:school" className="text-white text-2xl" />
				</div>
				<div className='text-left'>
					<h1 className="text-2xl font-bold text-gray-900">Study</h1>
					<h1 className="text-2xl font-bold text-orange-500 -mt-1">League</h1>
				</div>
			</div>
			<h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
			<p className="text-gray-600">Please sign in to your account</p>

			{/* Demo Credentials */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
				<div className="flex items-center space-x-2 mb-2">
					<Icon icon="material-symbols:info" className="text-blue-600" />
					<span className="text-sm font-medium text-blue-800">Use This Demo Credentials</span>
				</div>
				<div className="text-sm text-left text-blue-700">
					<p><strong>Email:</strong> demo@studyleague.com</p>
					<p><strong>Password:</strong> demo1234</p>
				</div>
			</div>
		</div>
	)
}

export default Header