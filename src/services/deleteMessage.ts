import { URL_BASE_API } from '../constants/url'

export const deleteMessage = (msgId: number) => {
  const body = { msgId }
  return fetch(`${URL_BASE_API}/messages`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
