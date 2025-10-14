// SECONDS => MINUTES:SECONDS FORMATTER
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// MINUTES => SECONDS CONVERTER
export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60
}

// SECONDS => MINUTES CONVERTER
export const secondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 60)
}
