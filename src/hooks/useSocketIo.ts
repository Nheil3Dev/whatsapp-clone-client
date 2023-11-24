import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { URL_SERVER } from '../constants/url'
import { IMessage, IUserMin } from '../types/types'
import { normalizeDate } from '../utils/normalizeDate'

export function useSocketIo (user: IUserMin | undefined) {
  const [socket, setSocket] = useState<Socket>()
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [delMsg, setDelMsg] = useState({ msgId: 0, chatId: '' })
  const [modMsg, setModMsg] = useState({ msgId: 0, content: '', chatId: '' })
  const lastMsg = messages[messages.length - 1]

  const sendMessage = (content: string, chatId: string, type: 'conversation'|'group') => {
    const date = normalizeDate()
    if (type === 'conversation') {
      return socket?.emit('whatsapp clone msg', content, date, null, chatId)
    }
    return socket?.emit('whatsapp clone msg', content, date, chatId, null)
  }

  const deleteMessage = (msgId: number, chatId: string) => {
    return socket?.emit('delete msg', msgId, chatId)
  }

  const modifyMessage = (msgId: number, content: string, chatId: string) => {
    return socket?.emit('modify msg', msgId, content, chatId)
  }

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const newSocket = io(URL_SERVER, {
      auth: {
        user,
        serverOffset: 0
      }
    })

    setSocket(newSocket)
    setIsConnected(true)

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

    function onDeleteMsg (msgId: number, chatId: string) {
      const newDelMsg = { msgId, chatId }
      setDelMsg(newDelMsg)
    }

    function onModifyMsg (msgId: number, content: string, chatId: string) {
      const newModMsg = { msgId, content, chatId }
      setModMsg(newModMsg)
    }

    newSocket.on('connect', onConnect)
    newSocket.on('disconnect', onDisconnect)
    newSocket.on('whatsapp clone msg', onMessages)
    newSocket.on('delete msg', onDeleteMsg)
    newSocket.on('modify msg', onModifyMsg)

    return () => {
      newSocket.off('connect', onConnect)
      newSocket.off('disconnect', onDisconnect)
      newSocket.off('whatsapp clone msg', onMessages)
      newSocket.off('delete msg', onDeleteMsg)
      newSocket.off('modify msg', onModifyMsg)
      newSocket.disconnect()
    }
  }, [user?.id])

  return { messages, setMessages, lastMsg, isConnected, setIsConnected, socket, sendMessage, deleteMessage, delMsg, modMsg, modifyMessage }
}
