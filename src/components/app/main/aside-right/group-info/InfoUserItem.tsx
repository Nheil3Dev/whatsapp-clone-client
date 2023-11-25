import { useContext } from 'react'
import { openInfoUser } from '../../../../../actions/asideRightActions'
import { MainContext } from '../../../../../context/mainContext'
import { UserContext } from '../../../../../context/userContext'
import { IUser } from '../../../../../types/types'
import { UserImg } from '../../../../lib/image/UserImg'
import './InfoUserItem.css'

export function InfoUserItem ({ user, isAdmin }: {user: IUser, isAdmin?: boolean}) {
  const { dispatchAsideRight } = useContext(MainContext)
  const { user: auth } = useContext(UserContext)
  return (
    <div className="info-user-item" onClick={() => dispatchAsideRight(openInfoUser(user))}>
      <UserImg className='info-user-img' user={user} />
      <div className='info-user-data'>
        <div className='info-user-title-container'>
          <h5 className="info-user-title">{user.id === auth?.id ? 'Tú' : user.alias}</h5>
          {isAdmin && <span className='admin'>Admin. del grupo</span>}
        </div>
        <p className="info-user-subtitle">{user.info}</p>
      </div>
    </div>
  )
}
