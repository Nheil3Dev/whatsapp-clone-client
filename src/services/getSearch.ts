import { URL_BASE_API } from '../constants/url'

export const getSearch = async (filter: string, userId: string) => {
  return await fetch(`${URL_BASE_API}/users/all/${userId}?filter=${filter}`)
    .then(res => res.json())
}
