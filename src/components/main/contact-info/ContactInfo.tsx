import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { ChatInfoProvider } from '../../../context/chatInfoContext'
import { BlockIcon } from '../../icons/BlockIcon'
import { DislikeIcon } from '../../icons/DislikeIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import { XIcon } from '../../icons/XIcon'
import './ContactInfo.css'
import { ContactMoreInfo } from './ContactMoreInfo'
import { ContactPrincipalInfo } from './ContactPrincipalInfo'

interface ContactInfoProps {
  visible: boolean
  onClose: () => void
}

export function ContactInfo ({ visible, onClose }: ContactInfoProps) {
  const { chat } = useContext(ChatContext)
  return (
    <aside className={visible ? 'contact-info visible-info' : 'contact-info'}>
      <header className='contact-info-header'>
        <button onClick={() => onClose()} className="icon-button">
          <XIcon />
        </button>
        <h3 className="info-title">Info. del contacto</h3>
      </header>
      <section className="info-container">
        <ChatInfoProvider>
          <ContactPrincipalInfo />
          <ContactMoreInfo />
        </ChatInfoProvider>
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
    </aside>
  )
}
