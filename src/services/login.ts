import { URL_BASE_API } from '../constants/url'
import { IAuth } from '../types/types'

export const login = (auth: IAuth) => {
  return fetch(`${URL_BASE_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(auth)
  })
    .then(res => res.json())
}
