import { IUser } from '../../../types/types'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { RemarkUser } from '../../search/RemarkUser'
import './UserItem.css'

interface UserItemProps {
  user: IUser
  filter: string
}

export function UserItem ({ user, filter }: UserItemProps) {
  return (
    <div className="user-item-container">
      <div className='user-item-avatar'>
        <UserDefaultAvatar />
      </div>
      <div className='user-item-info'>
        <h5><RemarkUser user={user.alias} filter={filter} /></h5>
        <p>{user.info}</p>
      </div>
    </div>
  )
}
