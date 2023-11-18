import { URL_BASE_API } from '../constants/url'

export const createConversation = (conversationId: string, date: string, usersId: string[]) => {
  const body = {
    conversationId,
    date,
    usersId
  }
  return fetch(`${URL_BASE_API}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
