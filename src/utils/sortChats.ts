import { IChat } from '../types/types'

export const sortChats = (chatA: IChat, chatB: IChat) => {
  const lastMessageA = chatA?.messages[chatA.messages.length - 1]
  const lastMessageB = chatB?.messages[chatB.messages.length - 1]

  const dateA = new Date(lastMessageA?.date ?? chatA.date)
  const dateB = new Date(lastMessageB?.date ?? chatB.date)

  return Number(dateB) - Number(dateA) // Ordenar en orden descendente (más reciente primero)
}
