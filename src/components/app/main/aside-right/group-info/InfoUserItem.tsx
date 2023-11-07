import { useContext } from 'react'
import { USER } from '../../../../../constants/user'
import { MainContext } from '../../../../../context/mainContext'
import { IUser } from '../../../../../types/types'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import './InfoUserItem.css'

export function InfoUserItem ({ user, isAdmin }: {user: IUser, isAdmin?: boolean}) {
  const { openInfoUser } = useContext(MainContext)
  return (
    <div className="info-user-item" onClick={() => openInfoUser && openInfoUser(user)}>
      <span className="info-user-img"><UserDefaultAvatar /></span>
      <div className='info-user-data'>
        <div className='info-user-title-container'>
          <h5 className="info-user-title">{user.alias === USER.alias ? 'Tú' : user.alias}</h5>
          {isAdmin && <span className='admin'>Admin. del grupo</span>}
        </div>
        <p className="info-user-subtitle">{user.info}</p>
      </div>
    </div>
  )
}
