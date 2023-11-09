import { socket } from '../hooks/useSocketIo'

export const sendMessage = (content: string, chatId: string, type: 'conversation'|'group') => {
  const date = new Date()
  const formatDate = date.toISOString().slice(0, 19).replace('T', ' ')
  if (type === 'conversation') {
    return socket.emit('whatsapp clone msg', content, formatDate, null, chatId)
  }
  return socket.emit('whatsapp clone msg', content, formatDate, chatId, null)
}
