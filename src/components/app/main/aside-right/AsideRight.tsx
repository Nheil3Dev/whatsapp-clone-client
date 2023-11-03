import { useContext, useEffect } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { XIcon } from '../../../lib/icons/XIcon'
import './AsideRight.css'
import { ContactInfo } from './contact-info/ContactInfo'
import { ChatContactInfo } from './contact-info/chat-contact-info/ChatContactInfo'
import { GroupInfo } from './group-info/GroupInfo'
import { SearchMsg } from './search-messages/SearchMsg'

export function AsideRight () {
  const { visible, closeAside, closeContain } = useContext(MainContext)
  const { chat } = useContext(ChatContext)
  const className = visible?.aside ? 'aside-right visible-aside-right' : 'aside-right'
  useEffect(() => {
    if (visible?.aside === false) {
      setTimeout(() => closeContain && closeContain(), 100)
    }
  }, [visible?.aside])
  return (
    <aside className={className}>
      <header className='aside-right-header'>
        <button onClick={closeAside} className="icon-button">
          <XIcon />
        </button>
        <h3 className="search-title">
          {visible?.search && 'Buscar mensajes'}
          {visible?.infoChat && chat?.admin && 'Info. del grupo'}
          {visible?.infoChat && !chat?.admin && 'Info. del contacto'}
        </h3>
      </header>
      {visible?.search && <SearchMsg />}
      {visible?.infoChat && chat?.admin && <GroupInfo />}
      {visible?.infoChat && !chat?.admin && <ChatContactInfo />}
      {visible?.infoUser && <ContactInfo />}
    </aside>
  )
}
