import { createContext, JSX, useEffect, useState } from 'react'
import { IAuth } from '../types/types'
import { getUser } from '../utils/getUser'

interface IUserContext {
  user: IAuth | undefined
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export function UserProvider ({ children }: { children: JSX.Element}) {
  const [user, setUser] = useState<IAuth>()
  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}
