import { getLocalTime } from './getLocalTime'

export const getDate = (date: Date) => {
  const now = new Date()

  if (now.getFullYear() - date.getFullYear() >= 1) {
    const years = now.getFullYear() - date.getFullYear()
    return `${years} year${years === 1 ? '' : 's'} ago`
  } else if (now.getMonth() - date.getMonth() >= 1) {
    const months = now.getMonth() - date.getMonth()
    return `${months} month${months === 1 ? '' : 's'} ago`
  } else if (now.getDay() - date.getDay() >= 1) {
    const days = now.getDay() - date.getDay()
    return `${days} day${days === 1 ? '' : 's'} ago`
  } else {
    // habria que sumar dos horas
    return getLocalTime(date)
  }
}
