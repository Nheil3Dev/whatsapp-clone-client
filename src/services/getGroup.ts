import { URL_BASE_API } from '../constants/url'

export const getGroup = (groupId: string) => {
  return fetch(`${URL_BASE_API}/group/${groupId}`)
    .then(res => res.json())
}
