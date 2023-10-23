import { socket } from '../hooks/useSocketIo'

export const sendMessage = (msg: string) => {
  const date = new Date()
  const formatDate = date.toISOString().slice(0, 19).replace('T', ' ')
  socket.emit('whatsapp clone msg', msg, formatDate)
}
