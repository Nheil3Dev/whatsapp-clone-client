import { URL_BASE_API } from '../constants/url'

export const getConversation = (conversationId: string, userId: string) => {
  return fetch(`${URL_BASE_API}/chats/${conversationId}?userId=${userId}`)
    .then(res => res.json())
}
