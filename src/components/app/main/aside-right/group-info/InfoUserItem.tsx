import { useContext } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { UserContext } from '../../../../../context/userContext'
import { IUser } from '../../../../../types/types'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import './InfoUserItem.css'

export function InfoUserItem ({ user, isAdmin }: {user: IUser, isAdmin?: boolean}) {
  const { openInfoUser } = useContext(MainContext)
  const { user: auth } = useContext(UserContext)
  return (
    <div className="info-user-item" onClick={() => openInfoUser && openInfoUser(user)}>
      <span className="info-user-img"><UserDefaultAvatar /></span>
      <div className='info-user-data'>
        <div className='info-user-title-container'>
          <h5 className="info-user-title">{user.alias === auth?.alias ? 'Tú' : user.alias}</h5>
          {isAdmin && <span className='admin'>Admin. del grupo</span>}
        </div>
        <p className="info-user-subtitle">{user.info}</p>
      </div>
    </div>
  )
}
