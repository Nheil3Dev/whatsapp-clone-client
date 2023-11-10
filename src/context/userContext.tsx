import { createContext, JSX, useContext, useEffect, useState } from 'react'
import { LOCALSTORAGE } from '../constants/localStorage'
import { IAuth } from '../types/types'
import { getUser } from '../utils/getUser'
import { SocketContext } from './socketContext'

interface IUserContext {
  user: IAuth | undefined
  updateUser: (user: string) => void

}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export function UserProvider ({ children }: { children: JSX.Element}) {
  const { messages, setMessages } = useContext(SocketContext)
  const [user, setUser] = useState<IAuth>()

  const updateUser = (username: string) => {
    setUser({ id: user?.id ?? '', alias: username })
    localStorage.setItem(LOCALSTORAGE.ALIAS, username)
    const updatedMessages = messages.map(msg => {
      if (msg.userId === user?.id) {
        return {
          ...msg,
          alias: username
        }
      }
      return msg
    })
    setMessages(updatedMessages)
  }

  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}
