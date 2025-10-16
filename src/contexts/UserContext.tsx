import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { SERVER_HOST, SERVER_PORT } from '../constants/server'

export interface User {
	id: string
	name: string
	email: string
	avatar?: string
	role?: 'student' | 'teacher' | 'admin'
	preferences?: {
		theme: 'light' | 'dark' | 'system'
		notifications: boolean
		soundEnabled: boolean
	}
}

interface UserContextType {
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	updateUser: (updates: Partial<User>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}

interface UserProviderProps {
	children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	// Check for existing session on mount
	useEffect(() => {
		const checkAuthState = () => {
			try {
				// Read from localStorage (making a session check, requires cookie consent)
				const storedUser = localStorage.getItem('studyleague_user')
				const authToken = localStorage.getItem('studyleague_token')

				if (storedUser && authToken) {
					setUser(JSON.parse(storedUser))
				}
			} catch (error) {
				console.error('Error checking auth state:', error)
				// Clear invalid data
				localStorage.removeItem('studyleague_user')
				localStorage.removeItem('studyleague_token')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuthState()
	}, [])

	const login = async (email: string, password: string) => {
		setIsLoading(true)
		try {
			// Login API call
			const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}/api/auth/login`, { "email": email, "password": password })

			console.log('Login response:', response.data)

			// Simple validation for demo purposes
			if (response.data.email === 'demo@studyleague.com' && response.data.password === 'demo123') {
				const userData = {
					id: '1',
					name: 'How Wei Shan',
					email: email,
					avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
					role: 'student' as const,
					preferences: {
						theme: 'light' as const,
						notifications: true,
						soundEnabled: true,
					}
				}

				// Store in localStorage
				localStorage.setItem('studyleague_user', JSON.stringify(userData))
				localStorage.setItem('studyleague_token', 'mock-jwt-token-' + Date.now())

				setUser(userData)
			} else {
				throw new Error('Invalid email or password')
			}
		} catch (error) {
			console.error('Login failed:', error)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const logout = () => {
		setUser(null)

		// Clear user data and token from localStorage, forcing relogin
		localStorage.removeItem('studyleague_user')
		localStorage.removeItem('studyleague_token')
	}

	const updateUser = (updates: Partial<User>) => {
		if (user) {
			setUser({ ...user, ...updates })
		}
	}

	const value: UserContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout,
		updateUser,
	}

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}
