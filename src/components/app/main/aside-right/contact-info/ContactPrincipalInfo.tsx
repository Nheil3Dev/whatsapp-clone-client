import { useContext } from 'react'
import { closeAside } from '../../../../../actions/asideRightActions'
import { selectChat } from '../../../../../actions/chatActions'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { OpenChatIcon } from '../../../../lib/icons/OpenChatIcon'
import { UserImg } from '../../../../lib/image/UserImg'
import './ContactPrincipalInfo.css'

export function ContactPrincipalInfo () {
  const { asideRightState, dispatchAsideRight } = useContext(MainContext)
  const { dispatchChat, chats, addNewChat } = useContext(ChatContext)

  const handleClick = async () => {
    // Si tenemos ya un chat con ese contacto
    const newActiveChat = chats?.filter(chat => chat.name === asideRightState?.user.alias)[0]

    if (newActiveChat) {
      dispatchChat(selectChat(newActiveChat.id))
    } else {
      await addNewChat(asideRightState.user)
    }
    dispatchAsideRight(closeAside)
  }

  return (
    <article className="info-contact">
      <UserImg className='info-contact-img' user={asideRightState.user} />
      <h5 className="info-contact-title">
        {asideRightState?.user.alias}
      </h5>
      <p className="info-contact-description">
        {asideRightState?.user?.email}
      </p>
      {asideRightState?.user.alias &&
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
