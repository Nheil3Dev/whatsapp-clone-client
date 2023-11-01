import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { ChatInfoProvider } from '../../../context/chatInfoContext'
import { MainContext } from '../../../context/mainContext'
import { BackArrow } from '../../icons/BackArrow'
import { BlockIcon } from '../../icons/BlockIcon'
import { DislikeIcon } from '../../icons/DislikeIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import './ContactInfo.css'
import { ContactMoreInfo } from './ContactMoreInfo'
import { ContactPrincipalInfo } from './ContactPrincipalInfo'

export function ContactInfo () {
  const { chat } = useContext(ChatContext)
  const { visible, closeInfoUser } = useContext(MainContext)
  return (
    <div className={visible?.infoUser ? 'contact-info visible-info' : 'contact-info'}>
      <header className='contact-info-header'>
        <button onClick={closeInfoUser} className="icon-button">
          <BackArrow />
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
            Bloquear a {visible?.user.alias ?? chat?.name}
          </button>
          <button className="info-button">
            <DislikeIcon />
            Reportar a {visible?.user.alias ?? chat?.name}
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
