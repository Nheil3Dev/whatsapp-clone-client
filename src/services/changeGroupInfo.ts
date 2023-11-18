import { URL_BASE_API } from '../constants/url'

export const changeGroupInfo = (id: string, formData: { name: string, info: string }) => {
  return fetch(`${URL_BASE_API}/group/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
}
