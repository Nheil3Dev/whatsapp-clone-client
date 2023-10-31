import { JSX, createContext, useEffect, useState } from 'react'
import { getAllChats } from '../services/getAllChats'
import { getAllUsersGroup } from '../services/getAllUsersGroup'
import { IChat, IUser } from '../types/types'

interface IChatContext {
  chat: IChat
  chats: IChat[]
  groupUsers: IUser[]
  setChat: (prop: IChat) => void
  activeChat: string
  setActiveChat: (prop: string) => void
  groupLength: number
}

const USER = 'cd89bf8f-e422-47f5-867d-2567caf3e476'

export const ChatContext = createContext<Partial<IChatContext>>({})

export function ChatProvider ({ children }: { children: JSX.Element[] }) {
  const [activeChat, setActiveChat] = useState<string>('')
  const [chats, setChats] = useState<IChat[]>([])
  const [chat, setChat] = useState<IChat>()
  const [groupUsers, setGroupUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (chats) {
      const newChat = chats.filter(chat => chat.id === activeChat)
      setChat(newChat[0])
    }
  }, [activeChat, chats])

  useEffect(() => {
    getAllChats(USER)
      .then(chats => {
        setChats(chats)
        setChat(chats[0])
        setActiveChat(chats[0].id)
      })
  }, [])

  useEffect(() => {
    if (chat?.admin) {
      getAllUsersGroup(chat?.id)
        .then(users => setGroupUsers(users))
    }
  }, [chat])

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, groupUsers, groupLength: groupUsers.length }}>
      {children}
    </ChatContext.Provider>
  )
}
