import { Dictionary, groupBy } from 'lodash'
import { IUser } from '../../../../types/types'
import './ListOfUsers.css'
import { UserItem } from './UserItem'

interface ListOfUsersProps {
  filteredUsers: IUser[]
  addUser?: (user: IUser) => void
}

export function ListOfUsers ({ filteredUsers, addUser }: ListOfUsersProps) {
  const orderedFilteredUsers: Dictionary<IUser[]> = groupBy(filteredUsers, (user: IUser) => user.alias[0])

  return (
    <>
      {
        Object.entries(orderedFilteredUsers).map(([letter, users]) => (
          <div className='letter-users-group' key={letter}>
            <span className='letter'>{letter}</span>
            {
              users.map(user => (
                <UserItem key={user.id} user={user} addUser={addUser} />
              ))
            }
            </div>
        )
        )
      }
    </>
  )
}
