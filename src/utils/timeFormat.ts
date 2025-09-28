/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Converts minutes to seconds
 */
export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60
}

/**
 * Converts seconds to minutes (rounded)
 */
export const secondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 60)
}
