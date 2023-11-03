import { useContext } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import { UserDefaultAvatar } from '../../../../../lib/defaults-avatars/UserDefaultAvatar'
import './ChatContactPrincipalInfo.css'

export function ChatContactPrincipalInfo () {
  const { chat } = useContext(ChatContext)

  return (
    <article className="info-contact">
      <span className='info-contact-img'>
        <UserDefaultAvatar />
      </span>
      <h5 className="info-contact-title">{chat?.name}</h5>
      <p className="info-contact-description">{chat?.email}</p>
    </article>
  )
}
