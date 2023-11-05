export const compareDate = (date: Date, prevDate: Date) => {
  const d = new Date(date)
  const p = new Date(prevDate)
  if (`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}` === `${p.getDate()}/${p.getMonth()}/${p.getFullYear()}`) return true
  return false
}
