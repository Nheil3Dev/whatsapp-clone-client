import { useEffect, useState } from 'react'
import { IUser } from '../types/types'

export function useUsers () {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>()
  const delay = filter === '' ? 0 : 300

  useEffect(() => {
    setIsLoading(true)
    const index = setTimeout(() => {
      fetch(`http://localhost:1234/api/users?filter=${filter}`)
        .then(res => res.json())
        .then(users => {
          const newUsers = users.filter((user: IUser) => user.alias !== 'Claudio')
          setFilteredUsers(newUsers)
          setIsLoading(false)
        })
    }, delay)

    return () => clearTimeout(index)
  }, [filter])
  return { isLoading, filter, setFilter, filteredUsers }
}
