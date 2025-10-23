import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { SERVER_HOST, SERVER_PORT } from '../constants/server'

// User type and context interface
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

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Set up axios interceptors for authentication
  useEffect(() => {
    // Request interceptor to add auth token
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('studyleague_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Response interceptor to handle auth errors
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Token expired or invalid - logout user
          setUser(null)
          localStorage.removeItem('studyleague_user')
          localStorage.removeItem('studyleague_token')
        }
        return Promise.reject(error)
      }
    )

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedUser = localStorage.getItem('studyleague_user')
        const authToken = localStorage.getItem('studyleague_token')

        if (storedUser && authToken) {
          // Optionally verify token with server
          try {
            // You can add token verification here if needed
            // const response = await axios.get(`${SERVER_HOST}:${SERVER_PORT}/api/users/verify`, {
            //     headers: { Authorization: `Bearer ${authToken}` }
            // })

            setUser(JSON.parse(storedUser))
          } catch (tokenError) {
            console.error('Token verification failed:', tokenError)
            // Clear invalid session
            localStorage.removeItem('studyleague_user')
            localStorage.removeItem('studyleague_token')
          }
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
      // Login API call using the proper auth endpoint
      const response = await axios.post(
        `${SERVER_HOST}:${SERVER_PORT}/api/users/login`,
        {
          email: email,
          password: password
        }
      )

      // Check if the response is successful and contains valid data
      if (response.status === 200 && response.data) {
        const { user, token, user_id } = response.data

        console.log(response.data)

        const userData = {
          id: user_id || user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
            ? `${SERVER_HOST}:${SERVER_PORT}/api/files/usPOCKETBASE_URLers/${
                user_id || user.id
              }/${user.avatar}`
            : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',

          // To be implemented with preference saved in DB
          preferences: {
            theme: 'light' as const,
            notifications: true,
            soundEnabled: true
          }
        }

        // Store in localStorage
        localStorage.setItem('studyleague_user', JSON.stringify(userData))
        localStorage.setItem('studyleague_token', token)

        setUser(userData)
      } else {
        throw new Error('Invalid credentials or authentication failed')
      }
    } catch (error: any) {
      console.error('Login failed:', error)

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
          case 401:
            throw new Error('Invalid username or password')
          case 500:
            throw new Error(
              'Server is having some issues (500). Please try again later.'
            )
          case 404:
            throw new Error('Authentication service not found')
          case 403:
            throw new Error('Access forbidden. Please contact support.')
          default:
            throw new Error(
              `Server error (${error.response.status}). Please try again.`
            )
        }
      } else if (error.request) {
        // Network error - no response received
        throw new Error(
          'Unable to connect to server. Please check your internet connection.'
        )
      } else {
        // Other error
        throw new Error(error.message || 'Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const authToken = localStorage.getItem('studyleague_token')

      // Call logout API to invalidate token on server
      if (authToken) {
        try {
          await axios.post(
            `${SERVER_HOST}:${SERVER_PORT}/api/auth/logout`,
            {},
            {
              headers: { Authorization: `Bearer ${authToken}` }
            }
          )
        } catch (logoutError) {
          console.error('Logout API failed:', logoutError)
          // Continue with local logout even if server logout fails
        }
      }
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      // Always clear local session
      setUser(null)
      localStorage.removeItem('studyleague_user')
      localStorage.removeItem('studyleague_token')
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)

      // Update localStorage with new user data
      localStorage.setItem('studyleague_user', JSON.stringify(updatedUser))
    }
  }

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
