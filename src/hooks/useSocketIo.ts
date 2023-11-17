import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { IMessage } from '../types/types'
import { getUser } from '../utils/getUser'

export const socket = io('http://localhost:1234', {
  auth: {
    user: await getUser(),
    serverOffset: 0

  },
  autoConnect: false
})

export function useSocketIo () {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<IMessage[]>([])
  const lastMsg = messages[messages.length - 1]

  useEffect(() => {
    // socket.connect()

    function onConnect () {
      setIsConnected(true)
    }

    function onDisconnect () {
      setIsConnected(false)
      setMessages([])
    }

    function onMessages (id: number, alias: string, content: string, date: Date, userId: string, groupId: string, conversationId: string) {
      if (id > (lastMsg?.id ?? 0)) {
        setMessages(previous => [...previous, { id, alias, content, date, userId, groupId, conversationId }])
      }
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('whatsapp clone msg', onMessages)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('whatsapp clone msg', onMessages)
      socket.disconnect()
    }
  }, [])

  return { messages, setMessages, lastMsg, isConnected, setIsConnected }
}
