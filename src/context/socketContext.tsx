import { createContext, JSX, useContext } from 'react'
import { Socket } from 'socket.io-client'
import { useSocketIo } from '../hooks/useSocketIo'
import { SocketState } from '../reducers/socketReducer'
import { ChatType } from '../types/types'
import { UserContext } from './userContext'

interface ISocketContext {
  socket: Socket | undefined
  socketState: SocketState
  sendMessage: (content: string, chatId: string, type: ChatType) => void
  deleteMessage: (msgId: number, chatId: string) => void
  modifyMessage: (msgId: number, content: string, chatId: string) => void
  createConversation: (conversationId: string, date: Date | string, usersId: string[]) => void
  createGroup: (id: string, name: string, date: Date | string, admin: string, usersId: string[]) => void
  modifyGroup: (groupId: string, name: string, info: string) => void
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export function SocketProvider ({ children }: { children: JSX.Element}) {
  const { user } = useContext(UserContext)
  const { socket, socketState, sendMessage, deleteMessage, modifyMessage, createConversation, createGroup, modifyGroup } = useSocketIo(user)
  return (
    <SocketContext.Provider value={{ socket, socketState, sendMessage, deleteMessage, modifyMessage, createConversation, createGroup, modifyGroup }}>
    {children}
  </SocketContext.Provider>
  )
}
