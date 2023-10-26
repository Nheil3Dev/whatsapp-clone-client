import { useEffect, useState } from 'react'
import { IUser } from '../types/types'

export function useUsers () {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>()

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:1234/api/users?filter=${filter}`)
      .then(res => res.json())
      .then(users => {
        setFilteredUsers(users)
        setIsLoading(false)
      })
  }, [filter])
  return { isLoading, filter, setFilter, filteredUsers }
}
