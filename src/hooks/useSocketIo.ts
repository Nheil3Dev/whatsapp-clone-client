import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { IMessage } from '../types/types'

const getUserName = async () => {
  const username = await window.localStorage.getItem('user_chat')
  if (username) {
    return username
  }
  const random = String(Math.floor(Math.random() * 10000))
  return `Anonymous${random}`
}

export const socket = io('http://localhost:1234', {
  auth: {
    user: await getUserName(),
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
    }

    function onMessages (id: number, user: string, content: string, date: Date) {
      if (id > (lastMsg?.id ?? 0)) {
        setMessages(previous => [...previous, { id, user, content, date }])
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

  return { messages, lastMsg, isConnected, setIsConnected }
}
