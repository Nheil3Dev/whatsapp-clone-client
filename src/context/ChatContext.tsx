import { JSX, createContext, useContext } from 'react'
import { useChat } from '../hooks/useChat'
import { useChats } from '../hooks/useChats'
import { checkConversation } from '../services/checkConversation'
import { createConversation } from '../services/createConversation'
import { createGroup } from '../services/createGroup'
import { deleteChat } from '../services/deleteChat'
import { ChatType, IChat, IUser } from '../types/types'
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
  addNewGroup: (groupName: string, usersId: string[]) => void
  delChat: (groupId: string, type: ChatType) => void
}

export const ChatContext = createContext<IChatContext>({} as IChatContext)

export function ChatProvider ({ children }: { children: JSX.Element }) {
  const { lastMsg } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { chats, setChats } = useChats(lastMsg)
  const { chat, setChat, activeChat, setActiveChat, groupUsers, groupLength } = useChat(chats)

  const addNewChat = async (contact: IUser) => {
    // Comprobamos que no se haya creado ya
    const isCreated = chats.filter(chat => chat.contactId === contact.id)[0]
    if (isCreated) {
      setActiveChat(isCreated.id)
      return
    // Comprobamos que exista la conversación aunque nos hayamos salido de ella
    } else {
      if (!user || !contact) return
      const newChat = await checkConversation(user.id, contact.id ?? '')
      if (newChat?.id) {
        setChats([newChat, ...chats])
        setActiveChat(newChat.id)
        setChat(newChat)
        return
      }
    }

    // Creamos una conversación nueva
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
      setChats([newChat, ...chats])
      setActiveChat(newChat.id)
      setChat(newChat)
    }
  }

  const addNewGroup = async (groupName: string, usersId: string[]) => {
    if (!user) return
    const newGroup = {
      id: String(crypto.randomUUID()),
      name: groupName,
      info: '',
      date: normalizeDate(),
      admin: user?.id,
      adminAlias: user?.alias,
      messages: []
    }

    // Añadimos el id del propio usuario
    usersId.push(user.id)

    const response = await createGroup(newGroup, usersId)

    if (response) {
      setChats([newGroup, ...chats])
      setActiveChat(newGroup.id)
      setChat(newGroup)
    }
  }

  const delChat = async (chatId: string, type: ChatType) => {
    if (!user) return

    const response = await deleteChat(user?.id, chatId, type)

    if (response) {
      const newChats = chats.filter(chat => chat.id !== chatId)
      setChats(newChats)

      if (activeChat === chatId) setActiveChat('')
    }
  }

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, setChats, groupUsers, groupLength, addNewChat, addNewGroup, delChat }}>
      {children}
    </ChatContext.Provider>
  )
}
