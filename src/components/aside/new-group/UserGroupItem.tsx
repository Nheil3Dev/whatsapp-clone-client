import { IUser } from '../../../types/types'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { XIcon } from '../../icons/XIcon'
import './UserGroupItem.css'

interface UserGroupItemProps {
  user: IUser
  deleteUser: (user: IUser) => void
}

export function UserGroupItem ({ user, deleteUser }: UserGroupItemProps) {
  return (
    <div className='user-group-item-container'>
      <span className='user-group-item-img'>
        <UserDefaultAvatar />
      </span>
      <p>
        {user.alias}
      </p>
      <button className="icon-button" onClick={() => deleteUser(user)}>
        <XIcon />
      </button>
    </div>
  )
}
