import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import { ChatInfoProvider } from '../../../../../../context/chatInfoContext'
import { CommonGroups } from '../CommonGroups'
import { ContactButtons } from '../ContactButtons'
import './ChatContactInfo.css'
import { ChatContactMoreInfo } from './ChatContactMoreInfo'
import { ChatContactPrincipalInfo } from './ChatContactPrincipalInfo'

export function ChatContactInfo () {
  const { chat } = useContext(ChatContext)
  const [className, setClassName] = useState('chat-contact-info')
  useEffect(() => {
    setTimeout(() => setClassName('chat-contact-info visible-info'), 10)
  }, [])
  return (
    <div className={className}>
      <section className="info-container">
        <ChatInfoProvider>
          <ChatContactPrincipalInfo />
          <ChatContactMoreInfo />
        </ChatInfoProvider>
        <CommonGroups contactId={chat?.contactId} />
        <ContactButtons alias={chat?.name ?? ''} />
      </section>
    </div>
  )
}
