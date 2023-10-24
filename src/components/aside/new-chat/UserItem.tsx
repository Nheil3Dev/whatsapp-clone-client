import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import './UserItem.css'

export function UserItem () {
  return (
    <div className="user-item-container">
      <div className='user-item-avatar'>
        <UserDefaultAvatar />
      </div>
      <div className='user-item-info'>
        <h5>Claudio</h5>
        <p>Yo tampoco se vivir estoy improvisando...✌️</p>
      </div>
    </div>
  )
}
