import { useContext } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import { ChatImg } from '../../../../../lib/image/ChatImg'
import './ChatContactPrincipalInfo.css'

export function ChatContactPrincipalInfo () {
  const { chatState } = useContext(ChatContext)
  const { chat } = chatState

  return (
    <article className="info-contact">
      <ChatImg className='info-contact-img' chat={chat} />
      <h5 className="info-contact-title">{chat?.name}</h5>
      <p className="info-contact-description">{chat?.email}</p>
    </article>
  )
}
