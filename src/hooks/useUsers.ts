import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getAllFilteredUsers } from '../services/getAllFilteredUsers'
import { IUser } from '../types/types'

export function useUsers () {
  const { user: auth } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>()
  const delay = filter === '' ? 0 : 300

  useEffect(() => {
    setIsLoading(true)
    const index = setTimeout(() => {
      getAllFilteredUsers(filter)
        .then(users => {
          const newUsers = users.filter((user: IUser) => user.alias !== auth?.alias)
          setFilteredUsers(newUsers)
          setIsLoading(false)
        })
    }, delay)

    return () => clearTimeout(index)
  }, [filter, delay])
  return { isLoading, filter, setFilter, filteredUsers }
}
