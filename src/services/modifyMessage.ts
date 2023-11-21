import { URL_BASE_API } from '../constants/url'

export const modifyMessage = (msgId: number, content: string) => {
  const body = {
    msgId,
    content
  }
  return fetch(`${URL_BASE_API}/messages`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
