import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getAllChats } from '../services/getAllChats'
import { getConversation } from '../services/getConversation'
import { getGroup } from '../services/getGroup'
import { IChat, IMessage } from '../types/types'
import { sortChats } from '../utils/sortChats'

export function useChats (lastMsgSocket: IMessage, delMsg: { msgId: number, chatId: string }, modMsg: { msgId: number, content: string, chatId: string }, addConversation: { conversationId: string, usersId: string[] }, addGroup: { groupId: string, usersId: string[] }) {
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
    if (!user || !lastMsgSocket || (Number(lastMsgSocket?.id ?? 0)) <= lastMsg) return
    setLastMsg(Number(lastMsgSocket?.id))

    const chatIndex = chats.findIndex(chat => chat.id === lastMsgSocket.conversationId || chat.id === lastMsgSocket.groupId)

    // TODO: No deberiamos traernos todos los mensajes, sólo los de los canales que nos interesan
    if (chatIndex === -1) return

    const updatedChat = {
      ...chats[chatIndex],
      messages: [...chats[chatIndex].messages, lastMsgSocket]
    }
    const updatedChats = [updatedChat, ...chats.slice(0, chatIndex), ...chats.slice(chatIndex + 1)]
    setChats(updatedChats)
  }, [lastMsgSocket])

  // Borrado de mensajes
  useEffect(() => {
    if (delMsg?.msgId === 0) return

    const chat = chats.filter(chat => chat.id === delMsg.chatId)[0]

    if (chat) {
      const newMsgs = chat.messages.filter(message => message.id !== delMsg.msgId)
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
  }, [delMsg])

  // Modificación de mensajes
  useEffect(() => {
    if (modMsg.msgId === 0) return

    const chat = chats.filter(chat => chat.id === modMsg.chatId)[0]

    if (chat) {
      const newMsgs = chat.messages.map(message => {
        if (message.id === modMsg.msgId) {
          return {
            ...message,
            content: modMsg.content
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
  }, [modMsg])

  // Añadir nueva conversación
  useEffect(() => {
    const isMine = addConversation.usersId.filter(userId => userId === user?.id)[0]

    if (isMine) {
      getConversation(addConversation.conversationId, user?.id ?? '')
        .then((chat: IChat) => {
          const newChats = [{ ...chat, messages: [] }, ...chats]
          setChats(newChats)
        })
    }
  }, [addConversation.conversationId])

  // Añadir nuevo grupo
  useEffect(() => {
    const isMine = addGroup.usersId.filter(userId => userId === user?.id)[0]

    if (isMine) {
      getGroup(addGroup.groupId)
        .then(chat => {
          const newChats = [{ ...chat, messages: [] }, ...chats]
          setChats(newChats)
        })
    }
  }, [addGroup.groupId])

  return { chats, setChats }
}
