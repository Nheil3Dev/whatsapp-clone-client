import { JSX, createContext, useState } from 'react'

interface IAsideContext {
  isVisible: { userInfo: boolean, newChat: boolean, newGroup: boolean }
  openUserInfo: () => void
  openNewChat: () => void
  openNewGroup: () => void
  closeUserInfo: () => void
  closeNewChat: () => void
  closeNewGroup: () => void
}

export const AsideContext = createContext<Partial<IAsideContext>>({})

export function AsideProvider ({ children }: { children: JSX.Element}) {
  const [isVisible, setIsVisible] = useState({
    userInfo: false,
    newChat: false,
    newGroup: false
  })

  const openUserInfo = () => {
    setIsVisible({ userInfo: true, newChat: false, newGroup: false })
  }

  const openNewChat = () => {
    setIsVisible({ userInfo: false, newChat: true, newGroup: false })
  }

  const openNewGroup = () => {
    setIsVisible({ userInfo: false, newChat: isVisible.newChat, newGroup: true })
  }

  const closeUserInfo = () => {
    setIsVisible({ ...isVisible, userInfo: false })
  }

  const closeNewChat = () => {
    setIsVisible({ ...isVisible, newChat: false })
  }

  const closeNewGroup = () => {
    setIsVisible({ ...isVisible, newGroup: false })
  }

  return (
    <AsideContext.Provider value={{ isVisible, openUserInfo, openNewChat, openNewGroup, closeUserInfo, closeNewChat, closeNewGroup }}>
      {children}
    </AsideContext.Provider>
  )
}
