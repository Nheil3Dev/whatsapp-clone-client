import { URL_BASE_API } from '../constants/url'

export const getCommonGroups = (userId: string, contactId: string) => {
  return fetch(`${URL_BASE_API}/group/common/${userId}?contactId=${contactId}`)
    .then(res => res.json())
}
