export const getLocalTime = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + 2)
  return newDate.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
}
