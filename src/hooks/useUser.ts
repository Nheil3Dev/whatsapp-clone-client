import { useEffect, useState } from 'react'
import { LOCALSTORAGE } from '../constants/localStorage'
import { IUserMin } from '../types/types'
import { getUser } from '../utils/getUser'

export function useUser () {
  const [user, setUser] = useState<IUserMin>()

  const updateUsername = (newAlias: string) => {
    if (!user) return
    const newUser = { ...user, alias: newAlias }
    setUser(newUser)
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(newUser))
  }

  const saveUser = (id: string, alias: string) => {
    const newUser = { id, alias }
    setUser(newUser)
    window.localStorage.setItem(LOCALSTORAGE, JSON.stringify(newUser))
  }

  const clearUser = () => {
    setUser({ id: '', alias: '' })
    window.localStorage.removeItem(LOCALSTORAGE)
  }

  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])
  return { user, updateUsername, saveUser, clearUser }
}
