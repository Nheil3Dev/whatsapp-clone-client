import { URL_BASE_API } from '../constants/url'

export const getProfileData = (userId: string) => {
  return fetch(`${URL_BASE_API}/users/${userId}`)
    .then(res => res.json())
}
