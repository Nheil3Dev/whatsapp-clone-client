import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getSearch } from '../services/getSearch'

export function useSearchChatList () {
  const { user } = useContext(UserContext)
  const [filter, setFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState({
    contacts: [],
    conversations: [],
    groups: []
  })

  useEffect(() => {
    if (filter.length === 0 || !user) return
    setIsLoading(true)
    const id = setTimeout(() => {
      getSearch(filter, user?.id)
        .then(res => {
          setFilteredUsers(res)
          setIsLoading(false)
        })
    }, 300)
    return () => clearTimeout(id)
  }, [filter, user])

  return { filter, setFilter, isLoading, filteredUsers }
}
