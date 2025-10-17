import { useState, useEffect } from 'react'
import { targetsAPI } from '../services/api'
import type { StudyTarget } from '../services/api'

export const useStudyTargets = () => {
	const [targets, setTargets] = useState<StudyTarget[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchTargets = async () => {
		try {
			setLoading(true)
			setError(null)
			const data = await targetsAPI.getAll()
			setTargets(data)
		} catch (err: any) {
			console.error('Error fetching study targets:', err)
			setError(err.response?.data?.message || err.message || 'Failed to fetch study targets')
		} finally {
			setLoading(false)
		}
	}

	const createOrUpdateTarget = async (targetData: Omit<StudyTarget, 'id' | 'created' | 'updated'>) => {
		try {
			const result = await targetsAPI.createOrUpdate(targetData)
			setTargets(prev => {
				const existingIndex = prev.findIndex(target => target.user === targetData.user)
				if (existingIndex >= 0) {
					// Update existing
					const updated = [...prev]
					updated[existingIndex] = result
					return updated
				} else {
					// Add new
					return [...prev, result]
				}
			})
			return result
		} catch (err: any) {
			console.error('Error creating/updating target:', err)
			throw new Error(err.response?.data?.message || err.message || 'Failed to save study target')
		}
	}

	useEffect(() => {
		fetchTargets()
	}, [])

	return {
		targets,
		loading,
		error,
		refetch: fetchTargets,
		createOrUpdateTarget
	}
}
