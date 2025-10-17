import axios from 'axios'
import { SERVER_HOST, SERVER_PORT } from '../constants/server'

const API_BASE_URL = `${SERVER_HOST}:${SERVER_PORT}/api`

// Types based on the API documentation
export interface Achievement {
	id: string
	title: string
	description: string
	icon: string
	requiredHours: number
}

export interface UserAchievement {
	id: string
	user: string
	achievement: Achievement
	unlockedAt: string
}

export interface StudySession {
	id: string
	user: string
	room?: string
	durationMinutes: number
	active: boolean
	startedAt: string
	endedAt?: string
	integrityScore?: number
}

export interface StudyRoom {
	max_participants: any
	timing: number
	id: string
	room_name: string
	host: string
	participants: number
	maxParticipants: number
	isPublic: boolean
	thumbnail?: string
	webrtcSessionId?: string
}

export interface Discussion {
	id: string
	author: string
	title: string
	content: string
	created: string
}

export interface DiscussionReply {
	id: string
	author: string
	discussion: string
	body: string
	created: string
}

export interface StudyTarget {
	id: string
	user: string
	dailyTarget: number
	weeklyTarget: number
	monthlyTarget: number
	created: string
	updated: string
}

export interface LeaderboardEntry {
	user_avatar: any
	userAvatar: string
	avatar: string
	user_name: string
	user_id: string
	id: string
	user: any // Will be expanded user object
	dayTotal: number
	monthTotal: number
	overallTotal: number
}

// Achievements API
export const achievementsAPI = {
	// Get all achievements
	getAll: async (): Promise<Achievement[]> => {
		const response = await axios.get(`${API_BASE_URL}/achievements/`)
		return response.data
	},

	// Get achievement by ID
	getById: async (id: string): Promise<Achievement> => {
		const response = await axios.get(`${API_BASE_URL}/achievements/${id}`)
		return response.data
	},

	// Get user achievements
	getUserAchievements: async (userId: string): Promise<UserAchievement[]> => {
		const response = await axios.get(`${API_BASE_URL}/achievements/user/${userId}`)
		return response.data
	},

	// Unlock achievement
	unlockAchievement: async (userId: string, achievementId: string): Promise<UserAchievement> => {
		const response = await axios.post(`${API_BASE_URL}/achievements/unlock`, {
			user: userId,
			achievement: achievementId
		})
		return response.data
	},

	// Admin: Create achievement
	create: async (achievement: Omit<Achievement, 'id'>): Promise<Achievement> => {
		const response = await axios.post(`${API_BASE_URL}/achievements/`, achievement)
		return response.data
	},

	// Admin: Update achievement
	update: async (id: string, updates: Partial<Achievement>): Promise<Achievement> => {
		const response = await axios.put(`${API_BASE_URL}/achievements/${id}`, updates)
		return response.data
	},

	// Admin: Delete achievement
	delete: async (id: string): Promise<void> => {
		await axios.delete(`${API_BASE_URL}/achievements/${id}`)
	}
}

// Study Sessions API
export const sessionsAPI = {
	// Get all sessions for authenticated user
	getAll: async (): Promise<StudySession[]> => {
		const response = await axios.get(`${API_BASE_URL}/sessions/`)
		return response.data
	},

	// Create new session
	create: async (session: Omit<StudySession, 'id'>): Promise<StudySession> => {
		const response = await axios.post(`${API_BASE_URL}/sessions/`, session)
		return response.data
	},

	// Update session
	update: async (id: string, updates: Partial<StudySession>): Promise<StudySession> => {
		const response = await axios.put(`${API_BASE_URL}/sessions/${id}`, updates)
		return response.data
	},

	// Delete session
	delete: async (id: string): Promise<void> => {
		await axios.delete(`${API_BASE_URL}/sessions/${id}`)
	}
}

// Study Rooms API
export const roomsAPI = {
	// Get all rooms
	getAll: async (): Promise<StudyRoom[]> => {
		const response = await axios.get(`${API_BASE_URL}/rooms/`)
		return response.data
	},

	// Create new room
	create: async (room: Omit<StudyRoom, 'id'>): Promise<StudyRoom> => {
		const response = await axios.post(`${API_BASE_URL}/rooms/`, room)
		return response.data
	},

	// Update room
	update: async (id: string, updates: Partial<StudyRoom>): Promise<StudyRoom> => {
		const response = await axios.put(`${API_BASE_URL}/rooms/${id}`, updates)
		return response.data
	},

	// Delete room
	delete: async (id: string): Promise<void> => {
		await axios.delete(`${API_BASE_URL}/rooms/${id}`)
	}
}

// Discussions API
export const discussionsAPI = {
	// Get all discussions
	getAll: async (): Promise<Discussion[]> => {
		const response = await axios.get(`${API_BASE_URL}/discussions/`)
		return response.data
	},

	// Get discussion by ID
	getById: async (id: string): Promise<Discussion> => {
		const response = await axios.get(`${API_BASE_URL}/discussions/${id}`)
		return response.data
	},

	// Create new discussion
	create: async (discussion: Omit<Discussion, 'id' | 'created'>): Promise<Discussion> => {
		const response = await axios.post(`${API_BASE_URL}/discussions/`, discussion)
		return response.data
	},

	// Update discussion
	update: async (id: string, updates: Partial<Discussion>): Promise<Discussion> => {
		const response = await axios.put(`${API_BASE_URL}/discussions/${id}`, updates)
		return response.data
	},

	// Delete discussion
	delete: async (id: string): Promise<void> => {
		await axios.delete(`${API_BASE_URL}/discussions/${id}`)
	},

	// Get replies for discussion
	getReplies: async (discussionId: string): Promise<DiscussionReply[]> => {
		const response = await axios.get(`${API_BASE_URL}/discussions/${discussionId}/replies`)
		return response.data
	},

	// Add reply to discussion
	addReply: async (discussionId: string, reply: { author: string; body: string }): Promise<DiscussionReply> => {
		const response = await axios.post(`${API_BASE_URL}/discussions/${discussionId}/replies`, reply)
		return response.data
	}
}

// Study Targets API
export const targetsAPI = {
	// Get all targets for authenticated user
	getAll: async (): Promise<StudyTarget[]> => {
		const response = await axios.get(`${API_BASE_URL}/targets/`)
		return response.data
	},

	// Create or update target
	createOrUpdate: async (target: Omit<StudyTarget, 'id' | 'created' | 'updated'>): Promise<StudyTarget> => {
		const response = await axios.post(`${API_BASE_URL}/targets/`, target)
		return response.data
	}
}

// Leaderboard API
export const leaderboardAPI = {
	// Get leaderboard
	get: async (): Promise<LeaderboardEntry[]> => {
		const response = await axios.get(`${API_BASE_URL}/leaderboard/`)
		return response.data
	}
}

// Auth API
export const authAPI = {
	// Login
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_BASE_URL}/auth/login`, {
			email,
			password
		})
		return response.data
	},

	// Logout
	logout: async () => {
		const response = await axios.post(`${API_BASE_URL}/auth/logout`)
		return response.data
	}
}

// Users API
export const usersAPI = {
	// Get all users (may be restricted)
	getAll: async () => {
		const response = await axios.get(`${API_BASE_URL}/users/`)
		return response.data
	},

	// Get user by ID
	getById: async (id: string) => {
		const response = await axios.get(`${API_BASE_URL}/users/${id}`)
		return response.data
	},

	// Register new user
	register: async (userData: { email: string; password: string; name: string; avatar?: string }) => {
		const response = await axios.post(`${API_BASE_URL}/users/`, userData)
		return response.data
	},

	// Login (alternative endpoint)
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_BASE_URL}/users/login`, {
			email,
			password
		})
		return response.data
	},

	// Logout (alternative endpoint)
	logout: async () => {
		const response = await axios.post(`${API_BASE_URL}/users/logout`)
		return response.data
	}
}
