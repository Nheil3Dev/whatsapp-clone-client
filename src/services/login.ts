import { IAuth } from '../types/types'

export const login = (auth: IAuth) => {
  return fetch('http://localhost:1234/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(auth)
  })
    .then(res => res.json())
}
