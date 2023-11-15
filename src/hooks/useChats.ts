import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { getAllChats } from '../services/getAllChats'
import { IChat, IMessage } from '../types/types'

export function useChats (messages: IMessage[]) {
  const [chats, setChats] = useState<IChat[]>([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) return
    getAllChats(user.id)
      .then(chats => {
        const newChats = chats.map((chat: IChat) => {
          const newChat = {
            ...chat,
            messages: messages.filter(msg => msg.groupId === chat.id || msg.conversationId === chat.id)
          }
          return newChat
        })
        const sortedChats = newChats.slice().sort((chatA: IChat, chatB: IChat) => {
          const lastMessageA = chatA?.messages[chatA.messages.length - 1]
          const lastMessageB = chatB?.messages[chatB.messages.length - 1]

          const dateA = new Date(lastMessageA?.date ?? chatA.date)
          const dateB = new Date(lastMessageB?.date ?? chatB.date)

          return Number(dateB) - Number(dateA) // Ordenar en orden descendente (más reciente primero)
        })
        setChats(sortedChats)
      })
  }, [messages, user?.id])

  return { chats, setChats }
}
