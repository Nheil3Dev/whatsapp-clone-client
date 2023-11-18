import { URL_BASE_API } from '../constants/url'

export const changeProfileData = (userId: string, formData: { alias: string, info: string}) => {
  return fetch(`${URL_BASE_API}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
}
