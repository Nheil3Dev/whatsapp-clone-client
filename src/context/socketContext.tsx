import { createContext, JSX, useContext } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketIo } from '../hooks/useSocketIo'
import { IMessage } from '../types/types'
import { UserContext } from './userContext'

interface ISocketContext {
  messages: IMessage[]
  setMessages: (prop: IMessage[]) => void
  isConnected: boolean
  setIsConnected: (prop: boolean) => void
  socket: Socket | undefined
  lastMsg: IMessage
  sendMessage: (content: string, chatId: string, type: 'conversation' | 'group') => void
  deleteMessage: (msgId: number, chatId: string) => void
  modifyMessage: (msgId: number, content: string, chatId: string) => void
  delMsg: { msgId: number, chatId: string }
  modMsg: { msgId: number, content: string, chatId: string }
  createConversation: (conversationId: string, date: Date | string, usersId: string[]) => void
  createGroup: (id: string, name: string, date: Date | string, admin: string, usersId: string[]) => void
  addConversation: { conversationId: string, usersId: string[] }
  addGroup: { groupId: string, usersId: string[] }
  modifyGroup: (groupId: string, name: string, info: string) => void
  modGroup: { groupId: string, name: string, info: string }
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export function SocketProvider ({ children }: { children: JSX.Element}) {
  const { user } = useContext(UserContext)
  const { socket, messages, setMessages, isConnected, setIsConnected, lastMsg, sendMessage, delMsg, deleteMessage, modMsg, modifyMessage, createConversation, createGroup, addConversation, addGroup, modGroup, modifyGroup } = useSocketIo(user)
  return (
    <SocketContext.Provider value={{ messages, setMessages, isConnected, setIsConnected, socket, lastMsg, sendMessage, delMsg, deleteMessage, modMsg, modifyMessage, createConversation, createGroup, addConversation, addGroup, modGroup, modifyGroup }}>
    {children}
  </SocketContext.Provider>
  )
}
