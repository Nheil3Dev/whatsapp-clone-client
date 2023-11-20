import { URL_BASE_API } from '../constants/url'

export const checkConversation = (userId1: string, userId2: string) => {
  return fetch(`${URL_BASE_API}/chats/check?userId1=${userId1}&userId2=${userId2}`)
    .then(res => res.json())
}
