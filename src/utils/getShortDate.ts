export const getShortDate = (date: string | Date) => {
  const newDate = new Date(date)
  const shortDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
  return shortDate
}
