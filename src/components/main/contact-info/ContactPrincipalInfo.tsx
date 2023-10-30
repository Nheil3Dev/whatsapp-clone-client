import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { OpenChatIcon } from '../../icons/OpenChatIcon'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { chat } = useContext(ChatContext)

  return (
    <article className="info-contact">
      <span className='info-contact-img'>
        <UserDefaultAvatar />
      </span>
      <h5 className="info-contact-title">{chat?.name}</h5>
      <p className="info-contact-description">Email...</p>
      <button className='info-contact-btn'>
        <span className='info-contact-icon'>
          <OpenChatIcon />
        </span>
        Mensaje
      </button>
    </article>
  )
}
