import { getLocalTime } from './getLocalTime'

export const getDate = (d: Date, type: 'chat'|'lastMsg') => {
  const now = Date.now()
  const date = new Date(d)
  const fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const mSecDiff = now - date.valueOf()
  const daysDiff = mSecDiff / (1000 * 60 * 60 * 24)

  if (daysDiff > 7) {
    return fullDate
  } else if (daysDiff < 1) {
    if (type === 'lastMsg') {
      return getLocalTime(date)
    }
    return 'Hoy'
  } else if (daysDiff === 1) {
    return 'Ayer'
  } else {
    switch (date.getDay()) {
      case 1: return 'Lunes'
      case 2: return 'Martes'
      case 3: return 'Miércoles'
      case 4: return 'Jueves'
      case 5: return 'Viernes'
      case 6: return 'Sábado'
      case 0: return 'Domingo'
    }
  }
}
