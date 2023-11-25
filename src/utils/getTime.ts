export const getTime = (date: string | Date) => {
  const newDate = new Date(date)
  const time = `${newDate.getHours()}:${String(newDate.getMinutes()).padStart(
    2,
    '0'
  )}`
  return time
}
