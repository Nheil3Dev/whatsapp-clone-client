import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getAllChats } from '../services/getAllChats'
import { IChat, IMessage } from '../types/types'
import { sortChats } from '../utils/sortChats'

export function useChats (lastMsgSocket: IMessage) {
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
    // habría que cambiar el socket
    // si no es un mensaje para nuestros chats
    if (chatIndex === -1) return

    const updatedChat = {
      ...chats[chatIndex],
      messages: [...chats[chatIndex].messages, lastMsgSocket]
    }
    const updatedChats = [updatedChat, ...chats.slice(0, chatIndex), ...chats.slice(chatIndex + 1)]
    setChats(updatedChats)
  }, [lastMsgSocket])

  return { chats, setChats }
}
