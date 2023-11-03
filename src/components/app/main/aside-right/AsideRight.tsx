import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { useAsideEffect } from '../../../../hooks/useAsideEffect'
import './AsideRight.css'
import { HeaderAsideRight } from './HeaderAsideRight'
import { ContactInfo } from './contact-info/ContactInfo'
import { ChatContactInfo } from './contact-info/chat-contact-info/ChatContactInfo'
import { GroupInfo } from './group-info/GroupInfo'
import { SearchMsg } from './search-messages/SearchMsg'

export function AsideRight () {
  const { visible, closeContain } = useContext(MainContext)
  const { chat } = useContext(ChatContext)
  const { className } = useAsideEffect('aside-right', 'visible-aside-right', visible?.aside ?? false, closeContain)

  return (
    <aside className={className}>
      <HeaderAsideRight />
      {visible?.search && <SearchMsg />}
      {visible?.infoChat && chat?.admin && <GroupInfo />}
      {visible?.infoChat && !chat?.admin && <ChatContactInfo />}
      {visible?.infoUser && <ContactInfo />}
    </aside>
  )
}
