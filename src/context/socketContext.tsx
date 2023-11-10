import { createContext, JSX } from 'react'
import { Socket } from 'socket.io-client'
import { socket, useSocketIo } from '../hooks/useSocketIo'
import { IMessage } from '../types/types'

interface ISocketContext {
  messages: IMessage[]
  setMessages: (prop: IMessage[]) => void
  isConnected: boolean
  setIsConnected: (prop: boolean) => void
  socket: Socket
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export function SocketProvider ({ children }: { children: JSX.Element}) {
  const { messages, setMessages, isConnected, setIsConnected } = useSocketIo()
  return (
    <SocketContext.Provider value={{ messages, setMessages, isConnected, setIsConnected, socket }}>
    {children}
  </SocketContext.Provider>
  )
}
