import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { SearchIcon } from '../../icons/SearchIcon'
import { InfoUserItem } from './InfoUserItem'
import './InfoUsers.css'

export function InfoUsers () {
  const { groupUsers, chat } = useContext(ChatContext)
  return (
    <article className="info-users">
          <div className="info-users-header">
            <p className="info-users-title">{groupUsers?.length} participantes</p>
            <button className="icon-button">
              <SearchIcon />
            </button>
          </div>
          {
            groupUsers?.map(user => {
              if (user.id === chat?.admin) {
                return (
                  <InfoUserItem key={user.id} user={user} isAdmin />
                )
              }
              return (
              <InfoUserItem key={user.id} user={user} />
              )
            })
          }
        </article>
  )
}
