import { URL_BASE_API } from '../constants/url'
import { IChat } from '../types/types'

export const createGroup = (newGroup: IChat, usersId: string[]) => {
  return fetch(`${URL_BASE_API}/group`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...newGroup, usersId })
  })
    .then(res => res.json())
}
