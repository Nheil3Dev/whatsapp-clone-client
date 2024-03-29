import { useContext } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import './ChatContactMoreInfo.css'

export function ChatContactMoreInfo () {
  const { chatState } = useContext(ChatContext)
  const { chat } = chatState
  return (
    <article className="contact-more-info-container">
        <p className='contact-more-info-title'>Info.</p>
        <p className="contact-more-info-name">{chat?.info}</p>
    </article>
  )
}
