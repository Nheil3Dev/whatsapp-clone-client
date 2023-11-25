import { useContext } from 'react'
import { selectChat } from '../../../../../actions/chatActions'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { OpenChatIcon } from '../../../../lib/icons/OpenChatIcon'
import { UserImg } from '../../../../lib/image/UserImg'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { visible, closeAside } = useContext(MainContext)
  const { dispatchChat, chats, addNewChat } = useContext(ChatContext)

  const handleClick = async () => {
    // Si tenemos ya un chat con ese contacto
    const newActiveChat = chats?.filter(chat => chat.name === visible?.user.alias)[0]

    if (newActiveChat) {
      dispatchChat(selectChat(newActiveChat.id))
    } else {
      await addNewChat(visible.user)
    }
    closeAside()
  }

  return (
    <article className="info-contact">
      <UserImg className='info-contact-img' user={visible.user} />
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
