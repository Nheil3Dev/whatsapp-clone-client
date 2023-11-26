import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { URL_SERVER } from '../constants/url'
import { ChatType, IMessage, IUserMin } from '../types/types'
import { normalizeDate } from '../utils/normalizeDate'

export function useSocketIo (user: IUserMin | undefined) {
  const [socket, setSocket] = useState<Socket>()
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [delMsg, setDelMsg] = useState({ msgId: 0, chatId: '' })
  const [modMsg, setModMsg] = useState({ msgId: 0, content: '', chatId: '' })
  const [addConversation, setAddConversation] = useState({ conversationId: '', usersId: [] as string[] })
  const [addGroup, setAddGroup] = useState({ groupId: '', usersId: [] as string[] })
  const [modGroup, setModGroup] = useState({ groupId: '', name: '', info: '' })
  const lastMsg = messages[messages.length - 1]

  const sendMessage = (content: string, chatId: string, type: ChatType) => {
    const date = normalizeDate()
    if (type === 'conversation') {
      return socket?.emit('send msg', content, date, null, chatId)
    }
    return socket?.emit('send msg', content, date, chatId, null)
  }

  const deleteMessage = (msgId: number, chatId: string) => {
    return socket?.emit('delete msg', msgId, chatId)
  }

  const modifyMessage = (msgId: number, content: string, chatId: string) => {
    return socket?.emit('modify msg', msgId, content, chatId)
  }

  const createConversation = (conversationId: string, date: Date | string, usersId: string[]) => {
    return socket?.emit('create conversation', conversationId, date, usersId)
  }

  const createGroup = (id: string, name: string, date: Date | string, admin: string, usersId: string[]) => {
    return socket?.emit('create group', id, name, date, admin, usersId)
  }

  const modifyGroup = (groupId: string, name: string, info: string) => {
    return socket?.emit('modify group', groupId, name, info)
  }
  useEffect(() => {
    if (!user?.id) return
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

    function onCreateConversation (conversationId: string, usersId: string[]) {
      const newConversation = { conversationId, usersId }
      setAddConversation(newConversation)
    }

    function onCreateGroup (groupId: string, usersId: string[]) {
      const newGroup = { groupId, usersId }
      setAddGroup(newGroup)
    }

    function onModifyGroup (groupId: string, name: string, info: string) {
      const newModGroup = { groupId, name, info }
      setModGroup(newModGroup)
    }

    newSocket.connect()
    newSocket.on('connect', onConnect)
    newSocket.on('disconnect', onDisconnect)
    newSocket.on('send msg', onMessages)
    newSocket.on('delete msg', onDeleteMsg)
    newSocket.on('modify msg', onModifyMsg)
    newSocket.on('create conversation', onCreateConversation)
    newSocket.on('create group', onCreateGroup)
    newSocket.on('modify group', onModifyGroup)

    return () => {
      newSocket.off('connect', onConnect)
      newSocket.off('disconnect', onDisconnect)
      newSocket.off('send msg', onMessages)
      newSocket.off('delete msg', onDeleteMsg)
      newSocket.off('modify msg', onModifyMsg)
      newSocket.off('create conversation', onCreateConversation)
      newSocket.off('create group', onCreateGroup)
      newSocket.off('modify group', onModifyGroup)
      newSocket.disconnect()
    }
  }, [user?.id])

  return { messages, setMessages, lastMsg, isConnected, setIsConnected, socket, sendMessage, deleteMessage, delMsg, modMsg, modifyMessage, createConversation, createGroup, addConversation, addGroup, modifyGroup, modGroup }
}
