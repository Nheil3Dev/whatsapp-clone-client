import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../../context/chatContext'
import { ChatInfoProvider } from '../../../../../../context/chatInfoContext'
import { BlockIcon } from '../../../../../lib/icons/BlockIcon'
import { DislikeIcon } from '../../../../../lib/icons/DislikeIcon'
import { TrashIcon } from '../../../../../lib/icons/TrashIcon'
import { ChatContactCommonGroups } from './ChatContactCommonGroups'
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
        <ChatContactCommonGroups contactId={chat?.contactId} />
        <div className='info-button-container'>
          <button className="info-button">
            <BlockIcon />
            Bloquear a {chat?.name}
          </button>
          <button className="info-button">
            <DislikeIcon />
            Reportar a {chat?.name}
          </button>
          <button className="info-button">
            <TrashIcon />
            Eliminar chat
          </button>
        </div>
      </section>
    </div>
  )
}
