import { getLocalTime } from './getLocalTime'

export const getDate = (date: Date) => {
  const now = new Date()

  if (now.getFullYear() - date.getFullYear() >= 1) {
    return `${now.getFullYear() - date.getFullYear()} years ago`
  } else if (now.getMonth() - date.getMonth() >= 1) {
    return `${now.getMonth() - date.getMonth()} months ago`
  } else if (now.getDay() - date.getDay() >= 1) {
    return `${now.getDay() - date.getDay()} days ago`
  } else {
    // habria que sumar dos horas
    return getLocalTime(date)
  }
}
