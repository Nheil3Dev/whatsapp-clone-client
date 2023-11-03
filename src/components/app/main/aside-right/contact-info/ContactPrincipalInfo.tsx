import { useContext } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import { OpenChatIcon } from '../../../../lib/icons/OpenChatIcon'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { visible } = useContext(MainContext)

  return (
    <article className="info-contact">
      <span className='info-contact-img'>
        <UserDefaultAvatar />
      </span>
      <h5 className="info-contact-title">{visible?.user.alias}</h5>
      <p className="info-contact-description">{visible?.user?.email}</p>
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
