import { JSX, createContext, useState } from 'react'

interface IAsideContext {
  isVisible: { userInfo: boolean, newChat: boolean }
  openUserInfo: () => void
  openNewChat: () => void
  closeUserInfo: () => void
  closeNewChat: () => void
}

export const AsideContext = createContext<Partial<IAsideContext>>({})

export function AsideProvider ({ children }: { children: JSX.Element}) {
  const [isVisible, setIsVisible] = useState({
    userInfo: false,
    newChat: false
  })

  const openUserInfo = () => {
    setIsVisible({ userInfo: true, newChat: false })
  }

  const openNewChat = () => {
    setIsVisible({ userInfo: false, newChat: true })
  }

  const closeUserInfo = () => {
    setIsVisible({ ...isVisible, userInfo: false })
  }

  const closeNewChat = () => {
    setIsVisible({ ...isVisible, newChat: false })
  }
  return (
    <AsideContext.Provider value={{ isVisible, openUserInfo, openNewChat, closeUserInfo, closeNewChat }}>
      {children}
    </AsideContext.Provider>
  )
}
