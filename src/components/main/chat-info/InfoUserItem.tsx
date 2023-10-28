import { IUser } from '../../../types/types'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import './InfoUserItem.css'

export function InfoUserItem ({ user, isAdmin }: {user: IUser, isAdmin?: boolean}) {
  return (
    <div className="info-user-item">
      <span className="info-user-img"><UserDefaultAvatar /></span>
      <div className='info-user-data'>
        <div className='info-user-title-container'>
          <h5 className="info-user-title">{user.alias}</h5>
          {isAdmin && <span className='admin'>Admin. del grupo</span>}
        </div>
        <p className="info-user-subtitle">{user.info}</p>
      </div>
    </div>
  )
}
