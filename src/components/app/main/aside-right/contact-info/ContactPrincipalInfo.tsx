import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import { OpenChatIcon } from '../../../../lib/icons/OpenChatIcon'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { visible, closeAside } = useContext(MainContext)
  const { setActiveChat, chats, addNewChat } = useContext(ChatContext)

  const handleClick = async () => {
    // Si tenemos ya un chat con ese contacto
    const newActiveChat = chats?.filter(chat => chat.name === visible?.user.alias)[0]

    if (newActiveChat) {
      setActiveChat(newActiveChat.id)
    } else {
      await addNewChat(visible.user)
    }
    closeAside()
  }

  return (
    <article className="info-contact">
      <span className='info-contact-img'>
        <UserDefaultAvatar />
      </span>
      <h5 className="info-contact-title">
        {visible?.user.alias}
      </h5>
      <p className="info-contact-description">
        {visible?.user?.email}
      </p>
      {visible?.user.alias &&
      <button
        className='info-contact-btn'
        onClick={handleClick}
      >
        <span className='info-contact-icon'>
          <OpenChatIcon />
        </span>
        Mensaje
      </button>}
    </article>
  )
}
