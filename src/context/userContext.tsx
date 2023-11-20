import { createContext, JSX, useEffect, useState } from 'react'
import { LOCALSTORAGE } from '../constants/localStorage'
import { IUserMin } from '../types/types'
import { getUser } from '../utils/getUser'

interface IUserContext {
  user: IUserMin | undefined
  updateUsername: (user: string) => void
  saveUser: (id: string, alias: string) => void
  clearUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export function UserProvider ({ children }: { children: JSX.Element}) {
  const [user, setUser] = useState<IUserMin>()

  const updateUsername = (newAlias: string) => {
    if (!user) return
    setUser({ ...user, alias: newAlias })
    localStorage.setItem(LOCALSTORAGE.ALIAS, newAlias)
  }

  const saveUser = (id: string, alias: string) => {
    const newUser = { id, alias }
    setUser(newUser)
    window.localStorage.setItem(LOCALSTORAGE.ID, id)
    window.localStorage.setItem(LOCALSTORAGE.ALIAS, alias)
  }

  const clearUser = () => {
    setUser({ id: '', alias: '' })
    window.localStorage.removeItem(LOCALSTORAGE.ID)
    window.localStorage.removeItem(LOCALSTORAGE.ALIAS)
  }

  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])
  return (
    <UserContext.Provider value={{ user, updateUsername, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
