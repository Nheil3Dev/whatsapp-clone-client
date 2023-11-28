import { URL_BASE_API } from '../constants/url'

export const register = (alias: string, email: string, password: string) => {
  const body = {
    id: crypto.randomUUID(),
    alias,
    info: 'No puedo hablar, sólo Whatsapp Clone',
    email,
    password
  }
  return fetch(`${URL_BASE_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
