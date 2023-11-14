import { IChat } from '../types/types'

export const createGroup = (newGroup: IChat, usersId: string[]) => {
  return fetch('http://localhost:1234/api/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...newGroup, usersId })
  })
    .then(res => res.json())
}
