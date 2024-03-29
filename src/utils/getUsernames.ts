import { IUser } from '../types/types'

export const getUsernames = (users: IUser[], userId: string) => {
  return users.length > 1
    ? users?.filter(u => u.id !== userId)
      .map(user => user.alias)
      .join(', ')
      .concat(', Tú')
    : 'Tú'
}
