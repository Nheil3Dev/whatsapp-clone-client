import { createContext, JSX } from 'react'
import { useUser } from '../hooks/useUser'
import { IUserMin } from '../types/types'

interface IUserContext {
  user: IUserMin | undefined
  updateUsername: (user: string) => void
  saveUser: (id: string, alias: string) => void
  clearUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export function UserProvider ({ children }: { children: JSX.Element}) {
  const { user, updateUsername, saveUser, clearUser } = useUser()
  return (
    <UserContext.Provider value={{ user, updateUsername, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
