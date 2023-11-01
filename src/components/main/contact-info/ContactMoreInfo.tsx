import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { MainContext } from '../../../context/mainContext'
import './ContactMoreInfo.css'

export function ContactMoreInfo () {
  const { chat } = useContext(ChatContext)
  const { visible } = useContext(MainContext)
  return (
    <article className="contact-more-info-container">
        <p className='contact-more-info-title'>Info.</p>
        <p className="contact-more-info-name">{visible?.user?.info ?? chat?.info}</p>
    </article>
  )
}
