import { URL_BASE_API } from '../constants/url'
import { ChatType } from '../types/types'

export const deleteChat = (userId: string, chatId: string, type: ChatType) => {
  const body = {
    userId,
    chatId
  }
  const route = type === 'group' ? '/group' : '/chats'

  return fetch(`${URL_BASE_API}${route}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
