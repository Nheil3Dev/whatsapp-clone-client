import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { MainContext } from '../../../context/mainContext'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { OpenChatIcon } from '../../icons/OpenChatIcon'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { chat } = useContext(ChatContext)
  const { visible } = useContext(MainContext)

  return (
    <article className="info-contact">
      <span className='info-contact-img'>
        <UserDefaultAvatar />
      </span>
      <h5 className="info-contact-title">{visible?.user.alias ?? chat?.name}</h5>
      <p className="info-contact-description">Email...</p>
      {visible?.user.alias &&
      <button className='info-contact-btn'>
        <span className='info-contact-icon'>
          <OpenChatIcon />
        </span>
        Mensaje
      </button>}
    </article>
  )
}
