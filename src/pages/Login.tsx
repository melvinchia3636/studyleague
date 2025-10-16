import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const { login, isAuthenticated } = useUser()
	const navigate = useNavigate()
	const location = useLocation()

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from?.pathname || '/'
			navigate(from, { replace: true })
		}
	}, [isAuthenticated, navigate, location.state])


	// Submission Logic Handler
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			await login(email, password)
			// Navigation will be handled by the useEffect above
		} catch (err: any) {
			setError(err.message || 'Login failed. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Hero Image */}
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

			{/* Right Side - Login Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="max-w-md w-full space-y-8">
					{/* Logo */}
					<div className="text-center">
						<div className="flex items-center justify-center space-x-3 mb-4">
							<div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
								<Icon icon="material-symbols:school" className="text-white text-2xl" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Study</h1>
								<h1 className="text-2xl font-bold text-orange-500 -mt-1">League</h1>
							</div>
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
						<p className="text-gray-600">Please sign in to your account</p>

						{/* Demo Credentials Notice */}
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
							<div className="flex items-center space-x-2 mb-2">
								<Icon icon="material-symbols:info" className="text-blue-600" />
								<span className="text-sm font-medium text-blue-800">Demo Credentials</span>
							</div>
							<div className="text-sm text-blue-700">
								<p><strong>Email:</strong> demo@studyleague.com</p>
								<p><strong>Password:</strong> demo123</p>
							</div>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<div className="flex items-center space-x-2">
								<Icon icon="material-symbols:error" className="text-red-600" />
								<span className="text-sm font-medium text-red-800">{error}</span>
							</div>
						</div>
					)}

					{/* Login Form */}
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-4">
							{/* Email Input */}
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
									Email address
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Icon icon="material-symbols:mail-outline" className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
										placeholder="Enter your email"
									/>
								</div>
							</div>

							{/* Password Input */}
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Icon icon="material-symbols:lock-outline" className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="password"
										name="password"
										type={showPassword ? 'text' : 'password'}
										autoComplete="current-password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
										onClick={() => setShowPassword(!showPassword)}
									>
										<Icon
											icon={showPassword ? "material-symbols:visibility-off" : "material-symbols:visibility"}
											className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
									Forgot your password?
								</Link>
							</div>
						</div>

						{/* Submit Button */}
						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
							>
								{isLoading ? (
									<div className="flex items-center space-x-2">
										<Icon icon="material-symbols:progress-activity" className="animate-spin h-5 w-5" />
										<span>Signing in...</span>
									</div>
								) : (
									<div className="flex items-center space-x-2">
										<Icon icon="material-symbols:login" className="h-5 w-5" />
										<span>Sign in</span>
									</div>
								)}
							</button>
						</div>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
							</div>
						</div>

						{/* Social Login Buttons */}
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
							>
								<Icon icon="logos:google-icon" className="h-5 w-5" />
								<span className="ml-2">Google</span>
							</button>

							<button
								type="button"
								className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
							>
								<Icon icon="logos:microsoft-icon" className="h-5 w-5" />
								<span className="ml-2">Microsoft</span>
							</button>
						</div>

						{/* Sign Up Link */}
						<div className="text-center">
							<span className="text-sm text-gray-600">
								Don't have an account?{' '}
								<Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
									Sign up for free
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
