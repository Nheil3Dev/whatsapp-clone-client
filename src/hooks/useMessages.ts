import { useEffect, useState } from 'react'
import { IMessage } from '../types/types'
import { useSocketIoConecction } from './useSocketIoConnection'

export function useMessages () {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { socket } = useSocketIoConecction()
  useEffect(() => {
    socket?.on('whatsapp clone msg', (serverOffset, user, content, date) => {
      const newMsg: IMessage = { id: serverOffset, user, content, date }
      const newMSgList = [...messages, newMsg]
      setMessages(newMSgList)

      socket.auth.serverOffset = serverOffset
    })
  }, [messages, socket])

  return { messages, setMessages }
}
