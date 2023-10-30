import { IUser } from '../../../types/types'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import './UserItem.css'

interface UserItemProps {
  user: IUser
  onClick: () => void
}

export function UserItem ({ user, onClick }: UserItemProps) {
  return (
    <div className="user-item-container" onClick={onClick}>
      <div className='user-item-avatar'>
        <UserDefaultAvatar />
      </div>
      <div className='user-item-info'>
        <h5>{user.alias}</h5>
        <p>{user.info}</p>
      </div>
    </div>
  )
}
