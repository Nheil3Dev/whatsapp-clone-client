import { createContext, JSX } from 'react'
import { Socket } from 'socket.io-client'
import { socket, useSocketIo } from '../hooks/useSocketIo'
import { IMessage } from '../types/types'

interface ISocketContext {
  messages: IMessage[]
  isConnected: boolean
  setIsConnected: (prop: boolean) => void
  socket: Socket
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export function SocketProvider ({ children }: { children: JSX.Element}) {
  const { messages, isConnected, setIsConnected } = useSocketIo()
  return (
    <SocketContext.Provider value={{ messages, isConnected, setIsConnected, socket }}>
    {children}
  </SocketContext.Provider>
  )
}
