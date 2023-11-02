import { JSX, createContext, useState } from 'react'
import { IUser } from '../types/types'

interface IMainContext {
  visible: { aside: boolean, infoChat: boolean, infoUser: boolean, search: boolean, user: Partial<IUser> }
  openInfo: () => void
  openSearch: () => void
  openInfoUser: (user: IUser) => void
  closeInfoUser: () => void
  closeAside: () => void
  closeContain: () => void
}

export const MainContext = createContext<Partial<IMainContext>>({})

export function MainProvider ({ children }: { children: JSX.Element[]}) {
  const [visible, setVisible] = useState({
    aside: false,
    infoChat: false,
    infoUser: false,
    search: false,
    user: {}
  })

  const openInfo = () => setVisible({ aside: true, infoChat: true, infoUser: false, search: false, user: {} })
  const openSearch = () => setVisible({ aside: true, infoChat: false, infoUser: false, search: true, user: {} })
  const openInfoUser = (user: IUser) => setVisible({ ...visible, infoUser: true, user })
  const closeInfoUser = () => setVisible({ ...visible, infoUser: false, user: {} })
  const closeAside = () => setVisible({ ...visible, aside: false })
  const closeContain = () => setVisible({ ...visible, aside: false, infoChat: false, search: false })
  return (
    <MainContext.Provider value={{ visible, openInfo, openSearch, openInfoUser, closeInfoUser, closeAside, closeContain }}>
      {children}
    </MainContext.Provider>
  )
}
