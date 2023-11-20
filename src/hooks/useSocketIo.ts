import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { URL_SERVER } from '../constants/url'
import { IMessage, IUserMin } from '../types/types'
import { getUser } from '../utils/getUser'

// TODO: este socket no se le modifica el user cuando cierro sesión
export const socket = io(URL_SERVER, {
  auth: {
    user: await getUser(),
    serverOffset: 0

  },
  autoConnect: false
})

export function useSocketIo (user: IUserMin | undefined) {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<IMessage[]>([])
  const lastMsg = messages[messages.length - 1]

  useEffect(() => {
    if (user?.id) {
      socket.connect()
      setIsConnected(true)
    }

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
  }, [user])

  return { messages, setMessages, lastMsg, isConnected, setIsConnected }
}
