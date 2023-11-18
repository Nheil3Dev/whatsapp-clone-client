import { URL_BASE_API } from '../constants/url'

export const getAllChats = (userId: string) => {
  return fetch(`${URL_BASE_API}/chats?idUser=${userId}`)
    .then(res => res.json())
}
