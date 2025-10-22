import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useUser } from '../../../contexts'
import Input from '../../../components/ui/Input'

function LoginForm({
	onError: setError,
}: {
	onError: (msg: string) => void
}) {
	const { login } = useUser()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
		<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
			<div className="space-y-4">
				<Input
					label="Email address"
					type="email"
					placeholder="Enter your email"
					value={email}
					setValue={setEmail}
					required
					autoComplete="email"
					icon="material-symbols:mail-outline"
				/>
				<Input
					label="Password"
					placeholder="••••••••••••"
					value={password}
					setValue={setPassword}
					required
					autoComplete="current-password"
					icon="material-symbols:lock-outline"
				/>
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
						className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 bg-gray-100 rounded"
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
			<button
				type="submit"
				disabled={isLoading}
				className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
			>
				<div className="flex items-center space-x-2">
					<Icon icon={isLoading ? "svg-spinners:180-ring" : "material-symbols:login"} className="size-5" />
					<span>{
						isLoading ? 'Signing in...' : 'Sign in'
					}</span>
				</div>
			</button>
			<div className="text-center">
				<span className="text-sm text-gray-600">
					Don't have an account?{' '}
					<Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
						Sign up for free
					</Link>
				</span>
			</div>
		</form>
	)
}

export default LoginForm