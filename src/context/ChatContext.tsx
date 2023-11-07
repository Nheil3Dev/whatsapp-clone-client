import { JSX, createContext } from 'react'
import { useChat } from '../hooks/useChat'
import { useChats } from '../hooks/useChats'
import { IChat, IUser } from '../types/types'

interface IChatContext {
  chat: IChat
  chats: IChat[]
  groupUsers: IUser[]
  setChat: (prop: IChat) => void
  setChats: (prop: IChat[]) => void
  activeChat: string
  setActiveChat: (prop: string) => void
  groupLength: number
}

export const ChatContext = createContext<IChatContext>({} as IChatContext)

export function ChatProvider ({ children }: { children: JSX.Element }) {
  const { chats, setChats } = useChats()
  const { chat, setChat, activeChat, setActiveChat, groupUsers, groupLength } = useChat(chats)

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, setChats, groupUsers, groupLength }}>
      {children}
    </ChatContext.Provider>
  )
}
