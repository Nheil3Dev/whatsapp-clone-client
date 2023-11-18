import { URL_BASE_API } from '../constants/url'

export const getAllFilteredMsg = (chatId: string, filter: string) => {
  return fetch(`${URL_BASE_API}/messages?chatId=${chatId}&search=${filter}`)
    .then(res => res.json())
}
