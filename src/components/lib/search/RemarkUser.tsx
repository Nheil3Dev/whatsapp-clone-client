interface RemarkUserProps {
  user: string
  filter: string
}

export function RemarkUser ({ user, filter }: RemarkUserProps) {
  const index = user.toLowerCase().indexOf(filter.toLowerCase())
  const filterCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()
  return (
    <span>
      {index > 0 ? user.slice(0, index) : ''}
      <span className="colored">{index === 0 ? filterCapitalized : filter.toLowerCase()}</span>
      {user.slice(index + filter.length)}
    </span>
  )
}
