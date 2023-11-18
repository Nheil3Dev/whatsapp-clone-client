import { URL_BASE_API } from '../constants/url'

export const getAllFilteredUsers = (filter: string) => {
  return fetch(`${URL_BASE_API}/users/filter/${filter === '' ? 'all' : filter}`)
    .then(res => res.json())
}
