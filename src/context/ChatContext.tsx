import { JSX, createContext, useEffect, useState } from 'react'
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
    fetch('http://localhost:1234/api/chats?idUser=cd89bf8f-e422-47f5-867d-2567caf3e476')
      .then(res => res.json())
      .then(chats => {
        setChats(chats)
        setChat(chats[0])
        setActiveChat(chats[0].id)
        console.log()
      })
  }, [])

  useEffect(() => {
    if (chat?.admin) {
      fetch(`http://localhost:1234/api/users/${chat.id}`)
        .then(res => res.json())
        .then(users => setGroupUsers(users))
    }
  }, [chat])

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, groupUsers, groupLength: groupUsers.length }}>
      {children}
    </ChatContext.Provider>
  )
}
