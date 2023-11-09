import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { UserContext } from '../../../../../context/userContext'
import { IUser } from '../../../../../types/types'
import { SearchIcon } from '../../../../lib/icons/SearchIcon'
import { InfoUserItem } from './InfoUserItem'
import './InfoUsers.css'

export function InfoUsers () {
  const { groupUsers, chat } = useContext(ChatContext)
  const { user: auth } = useContext(UserContext)

  const { me, restUsers } = groupUsers.reduce((result, user) => {
    if (user.alias === auth?.alias) {
      result.me = user
    } else {
      result.restUsers.push(user)
    }
    return result
  }, { me: {} as IUser, restUsers: [] as IUser[] })

  return (
    <article className="info-users">
          <div className="info-users-header">
            <p className="info-users-title">{groupUsers?.length} participantes</p>
            <button className="icon-button">
              <SearchIcon />
            </button>
          </div>
          <InfoUserItem key={me.id} user={me} isAdmin={me.id === chat.admin} />
          {
            restUsers?.map(user => (
                  <InfoUserItem key={user.id} user={user} isAdmin={user.id === chat.admin} />
            ))
          }
        </article>
  )
}
