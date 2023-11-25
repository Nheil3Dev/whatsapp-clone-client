import { useContext } from 'react'
import { closeContain } from '../../../../actions/asideRightActions'
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
  const { asideRightState, dispatchAsideRight } = useContext(MainContext)
  const { chatState } = useContext(ChatContext)
  const { className } = useAsideEffect('aside-right', 'visible-aside-right', asideRightState.aside, () => dispatchAsideRight(closeContain))
  const { chat } = chatState

  return (
    <aside className={className}>
      <HeaderAsideRight />
      {asideRightState.search && <SearchMsg />}
      {asideRightState.infoChat && chat?.admin && <GroupInfo />}
      {asideRightState.infoChat && !chat?.admin && <ChatContactInfo />}
      {asideRightState.infoUser && <ContactInfo />}
    </aside>
  )
}
