import { socket } from '../hooks/useSocketIo'
import { normalizeDate } from '../utils/normalizeDate'

export const sendMessage = (content: string, chatId: string, type: 'conversation'|'group') => {
  const date = normalizeDate()
  if (type === 'conversation') {
    return socket.emit('whatsapp clone msg', content, date, null, chatId)
  }
  return socket.emit('whatsapp clone msg', content, date, chatId, null)
}
