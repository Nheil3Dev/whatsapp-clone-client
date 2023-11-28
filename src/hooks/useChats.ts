import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { SocketState } from '../reducers/socketReducer'
import { getAllChats } from '../services/getAllChats'
import { getConversation } from '../services/getConversation'
import { getGroup } from '../services/getGroup'
import { IChat } from '../types/types'
import { sortChats } from '../utils/sortChats'

export function useChats (socketState: SocketState) {
  const [chats, setChats] = useState<IChat[]>([])
  const [lastMsg, setLastMsg] = useState<number>(0)
  const { user } = useContext(UserContext)

  // Trae los chats de la BD y los ordena según la fecha del último mensaje
  useEffect(() => {
    if (!user) return
    getAllChats(user.id)
      .then(res => {
        setLastMsg(res.lastMsg.id)

        const sortedChats = res.chats.slice().sort(sortChats)
        setChats(sortedChats)
      })
  }, [user?.id])

  // Actualiza los chats cuando llegan nuevos mensajes a través de web socket
  useEffect(() => {
    if (!user || !socketState.lastMsg || (Number(socketState.lastMsg?.id ?? 0)) <= lastMsg) return
    setLastMsg(Number(socketState.lastMsg?.id))

    const chatIndex = chats.findIndex(chat => chat.id === socketState.lastMsg.conversationId || chat.id === socketState.lastMsg.groupId)

    // TODO: No deberiamos traernos todos los mensajes, sólo los de los canales que nos interesan
    if (chatIndex === -1) return

    const updatedChat = {
      ...chats[chatIndex],
      messages: [...chats[chatIndex].messages, socketState.lastMsg]
    }
    const updatedChats = [updatedChat, ...chats.slice(0, chatIndex), ...chats.slice(chatIndex + 1)]
    setChats(updatedChats)
  }, [socketState.lastMsg])

  // Borrado de mensajes
  useEffect(() => {
    if (socketState.delMsg?.msgId === 0) return

    const chat = chats.filter(chat => chat.id === socketState.delMsg.chatId)[0]

    if (chat) {
      const newMsgs = chat.messages.filter(message => message.id !== socketState.delMsg.msgId)
      const newChat = { ...chat, messages: newMsgs }

      const newChats = chats.map(c => {
        if (c.id === newChat.id) {
          return newChat
        } else {
          return c
        }
      })
      setChats(newChats)
    }
  }, [socketState.delMsg])

  // Modificación de mensajes
  useEffect(() => {
    if (socketState.modMsg.msgId === 0) return

    const chat = chats.filter(chat => chat.id === socketState.modMsg.chatId)[0]

    if (chat) {
      const newMsgs = chat.messages.map(message => {
        if (message.id === socketState.modMsg.msgId) {
          return {
            ...message,
            content: socketState.modMsg.content
          }
        }
        return message
      })
      const newChat = { ...chat, messages: newMsgs }
      const newChats = chats.map(c => {
        if (c.id === newChat.id) {
          return newChat
        } else {
          return c
        }
      })
      setChats(newChats)
    }
  }, [socketState.modMsg])

  // Añadir nueva conversación
  useEffect(() => {
    const isMine = socketState.addConversation.usersId.filter(userId => userId === user?.id)[0]

    if (isMine) {
      getConversation(socketState.addConversation.conversationId, user?.id ?? '')
        .then((chat: IChat) => {
          const newChats = [{ ...chat, messages: [] }, ...chats]
          setChats(newChats)
        })
    }
  }, [socketState.addConversation.conversationId])

  // Añadir nuevo grupo
  useEffect(() => {
    const isMine = socketState.addGroup.usersId.filter(userId => userId === user?.id)[0]

    if (isMine) {
      getGroup(socketState.addGroup.groupId)
        .then(chat => {
          const newChats = [{ ...chat, messages: [] }, ...chats]
          setChats(newChats)
        })
    }
  }, [socketState.addGroup.groupId])

  // Modificar un grupo (nombre e info)
  useEffect(() => {
    const isMine = chats.filter(chat => chat.id === socketState.modGroup.groupId)[0]

    if (isMine) {
      const newChat = { ...isMine, name: socketState.modGroup.name, info: socketState.modGroup.info }
      const newChats = chats.map(chat => {
        if (chat.id === socketState.modGroup.groupId) return newChat
        return chat
      })
      setChats(newChats)
    }
  }, [socketState.modGroup])

  return { chats, setChats }
}
