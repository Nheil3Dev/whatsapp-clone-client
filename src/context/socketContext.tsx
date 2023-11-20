import { createContext, JSX, useContext } from 'react'
import { Socket } from 'socket.io-client'
import { socket, useSocketIo } from '../hooks/useSocketIo'
import { IMessage } from '../types/types'
import { UserContext } from './userContext'

interface ISocketContext {
  messages: IMessage[]
  setMessages: (prop: IMessage[]) => void
  isConnected: boolean
  setIsConnected: (prop: boolean) => void
  socket: Socket
  lastMsg: IMessage
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export function SocketProvider ({ children }: { children: JSX.Element}) {
  const { user } = useContext(UserContext)
  const { messages, setMessages, isConnected, setIsConnected, lastMsg } = useSocketIo(user)
  return (
    <SocketContext.Provider value={{ messages, setMessages, isConnected, setIsConnected, socket, lastMsg }}>
    {children}
  </SocketContext.Provider>
  )
}
