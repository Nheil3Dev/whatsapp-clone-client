import { JSX, createContext, useContext } from 'react'
import { useChat } from '../hooks/useChat'
import { useChats } from '../hooks/useChats'
import { createConversation } from '../services/createConversation'
import { IChat, IUser } from '../types/types'
import { normalizeDate } from '../utils/normalizeDate'
import { SocketContext } from './socketContext'
import { UserContext } from './userContext'

interface IChatContext {
  chat: IChat
  chats: IChat[]
  groupUsers: IUser[]
  setChat: (prop: IChat) => void
  setChats: (prop: IChat[]) => void
  activeChat: string
  setActiveChat: (prop: string) => void
  groupLength: number
  addNewChat: (prop: IUser) => void
}

export const ChatContext = createContext<IChatContext>({} as IChatContext)

export function ChatProvider ({ children }: { children: JSX.Element }) {
  const { messages } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { chats, setChats } = useChats(messages)
  const { chat, setChat, activeChat, setActiveChat, groupUsers, groupLength } = useChat(chats)

  const addNewChat = async (contact: IUser) => {
    // Comprobamos que no se haya creado ya
    const isCreated = chats.filter(chat => chat.contactId === contact.id)[0]
    if (isCreated) {
      setActiveChat(isCreated.id)
      return
    }

    const newChat = {
      id: String(crypto.randomUUID()),
      name: contact.alias,
      info: contact.info,
      email: contact.email,
      date: normalizeDate(),
      contactId: contact.id,
      messages: []
    }
    const response = await createConversation(newChat.id, newChat.date, [user?.id ?? '', contact.id ?? ''])

    if (response) {
      setChats([...chats, newChat])
      setActiveChat(newChat.id)
      setChat(newChat)
    }
  }

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, setChats, groupUsers, groupLength, addNewChat }}>
      {children}
    </ChatContext.Provider>
  )
}
