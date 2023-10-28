import { ChatInfoProvider } from '../../../context/chatInfoContext'
import { OutIcon } from '../../icons/OutIcon'
import { XIcon } from '../../icons/XIcon'
import './ChatInfo.css'
import { ChatMoreInfo } from './ChatMoreInfo'
import { ChatPrincipalInfo } from './ChatPrincipalInfo'
import { InfoUsers } from './InfoUsers'

interface ChatInfoProps {
  visible: boolean
  onClose: () => void
}

export function ChatInfo ({ visible, onClose }: ChatInfoProps) {
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
        <button className="info-button">
          <OutIcon />
          Salir del grupo
        </button>
      </section>
    </aside>
  )
}
