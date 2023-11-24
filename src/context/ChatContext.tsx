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
  editMsg: number
  setEditMsg: (id: number) => void
}

export const ChatContext = createContext<IChatContext>({} as IChatContext)

export function ChatProvider ({ children }: { children: JSX.Element }) {
  const { lastMsg, delMsg, modMsg } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { chats, setChats } = useChats(lastMsg, delMsg, modMsg)
  const { chat, setChat, activeChat, setActiveChat, groupUsers, groupLength, editMsg, setEditMsg } = useChat(chats)

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

  // const deleteMsg = async (msgId: number) => {
  //   const isDeleted = await deleteMessage(msgId)

  //   if (isDeleted) {
  //     const newMsgs = chat.messages.filter(message => message.id !== msgId)
  //     const newChat = { ...chat, messages: newMsgs }
  //     setChat(newChat)
  //     const newChats = chats.map(c => {
  //       if (c.id === newChat.id) {
  //         return newChat
  //       } else {
  //         return c
  //       }
  //     })
  //     setChats(newChats)
  //   }
  // }

  // const editMessage = async (newContent: string) => {
  //   const isModified = await modifyMessage(editMsg, newContent)

  //   if (isModified) {
  //     const newMsgs = chat.messages.map(message => {
  //       if (message.id === editMsg) {
  //         return {
  //           ...message,
  //           content: newContent
  //         }
  //       }
  //       return message
  //     })
  //     const newChat = { ...chat, messages: newMsgs }
  //     setChat(newChat)
  //     const newChats = chats.map(c => {
  //       if (c.id === newChat.id) {
  //         return newChat
  //       } else {
  //         return c
  //       }
  //     })
  //     setChats(newChats)
  //     setEditMsg(0)
  //   }
  // }

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, chat, setChat, chats, setChats, groupUsers, groupLength, addNewChat, addNewGroup, delChat, editMsg, setEditMsg }}>
      {children}
    </ChatContext.Provider>
  )
}
