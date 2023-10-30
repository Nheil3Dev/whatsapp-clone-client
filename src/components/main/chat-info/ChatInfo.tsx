import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { ChatInfoProvider } from '../../../context/chatInfoContext'
import { DislikeIcon } from '../../icons/DislikeIcon'
import { OutIcon } from '../../icons/OutIcon'
import { XIcon } from '../../icons/XIcon'
import { ContactInfo } from '../contact-info/ContactInfo'
import './ChatInfo.css'
import { ChatMoreInfo } from './ChatMoreInfo'
import { ChatPrincipalInfo } from './ChatPrincipalInfo'
import { InfoUsers } from './InfoUsers'

interface ChatInfoProps {
  visible: boolean
  onClose: () => void
}

export function ChatInfo ({ visible, onClose }: ChatInfoProps) {
  const { chat } = useContext(ChatContext)

  if (!chat?.admin) return <ContactInfo visible={visible} onClose={onClose} />
  return (
    <aside className={visible ? 'chat-info visible-info' : 'chat-info'}>
      <header className='chat-info-header'>
        <button onClick={() => onClose()} className="icon-button">
          <XIcon />
        </button>
        <h3 className="info-title">Info. del grupo</h3>
      </header>
      <section className="info-container">
        <ChatInfoProvider>
          <ChatPrincipalInfo />
          <ChatMoreInfo />
        </ChatInfoProvider>
        <InfoUsers />
        <div className='info-button-container'>
          <button className="info-button">
            <OutIcon />
            Salir del grupo
          </button>
          <button className="info-button">
            <DislikeIcon />
            Reportar grupo
          </button>
        </div>
      </section>
    </aside>
  )
}
