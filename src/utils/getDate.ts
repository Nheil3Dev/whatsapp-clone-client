import { getLocalTime } from './getLocalTime'

export const getDate = (date: Date) => {
  const now = new Date()

  if (now.getFullYear() - date.getFullYear() >= 1) {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  } else if (now.getMonth() - date.getMonth() > 1) {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  } else if (now.getDay() - date.getDay() >= 1) {
    const days = now.getDay() - date.getDay()
    if (days === 1) return 'ayer'
    if (days === 2) return 'anteayer'
    return `hace ${days} día${days === 1 ? '' : 's'}`
  } else {
    // habria que sumar dos horas
    return getLocalTime(date)
  }
}
