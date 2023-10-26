import { JSX, createContext, useEffect, useState } from 'react'
import { IChat } from '../types/types'

interface IChatContext {
  chat: IChat
  setChat: (prop: IChat) => void
  activeChat: string
  setActiveChat: (prop: string) => void
  chats: IChat[]
}

export const ChatContext = createContext<Partial<IChatContext>>({})

export function ChatProvider ({ children }: { children: JSX.Element[] }) {
  const [activeChat, setActiveChat] = useState<string>()
  const [chats, setChats] = useState<IChat[]>()
  const [chat, setChat] = useState<IChat>()
  useEffect(() => {
    if (chats) {
      const newChat = chats.filter(chat => chat.id === activeChat)
      setChat(newChat[0])
    }
  }, [activeChat])

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
  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats }}>
      {children}
    </ChatContext.Provider>
  )
}
