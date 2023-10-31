import { useEffect, useState } from 'react'
import { getAllFilteredUsers } from '../services/getAllFilteredUsers'
import { IUser } from '../types/types'

export function useUsers () {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>()
  const delay = filter === '' ? 0 : 300

  useEffect(() => {
    setIsLoading(true)
    const index = setTimeout(() => {
      getAllFilteredUsers(filter)
        .then(users => {
          const newUsers = users.filter((user: IUser) => user.alias !== 'Claudio')
          setFilteredUsers(newUsers)
          setIsLoading(false)
        })
    }, delay)

    return () => clearTimeout(index)
  }, [filter, delay])
  return { isLoading, filter, setFilter, filteredUsers }
}
