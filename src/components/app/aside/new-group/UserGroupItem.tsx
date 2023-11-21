import { IUser } from '../../../../types/types'
import { XIcon } from '../../../lib/icons/XIcon'
import { UserImg } from '../../../lib/image/UserImg'
import './UserGroupItem.css'

interface UserGroupItemProps {
  user: IUser
  deleteUser: (user: IUser) => void
}

export function UserGroupItem ({ user, deleteUser }: UserGroupItemProps) {
  return (
    <div className='user-group-item-container'>
      <UserImg className='user-group-item-img' user={user} />
      <p>
        {user.alias}
      </p>
      <button className="icon-button" onClick={() => deleteUser(user)}>
        <XIcon />
      </button>
    </div>
  )
}
