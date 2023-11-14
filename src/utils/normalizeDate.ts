export const normalizeDate = () => {
  const date = new Date()
  const formatDate = date.toISOString().slice(0, 19).replace('T', ' ')
  return formatDate
}
