import { IUser } from '../../../../types/types'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import './UserItem.css'

interface UserItemProps {
  user: IUser
  handleClick: (user: IUser) => Promise<void>
}

export function UserItem ({ user, handleClick }: UserItemProps) {
  return (
    <div className="user-item-container" onClick={async () => await handleClick(user)}>
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
