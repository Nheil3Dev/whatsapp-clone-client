import { URL_BASE_API } from '../constants/url'

export const getAllUsersGroup = (chatId: string) => {
  return fetch(`${URL_BASE_API}/group/users/${chatId}`)
    .then(res => res.json())
}
