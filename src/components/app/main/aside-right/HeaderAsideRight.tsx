import { useContext } from 'react'
import { closeAside, closeInfoUser } from '../../../../actions/asideRightActions'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { XIcon } from '../../../lib/icons/XIcon'
import './HeaderAsideRight.css'

export function HeaderAsideRight () {
  const { asideRightState, dispatchAsideRight } = useContext(MainContext)
  const { chatState } = useContext(ChatContext)
  const { chat } = chatState
  return (
    <header className='aside-right-header'>
        <button onClick={() => dispatchAsideRight(asideRightState?.infoUser ? closeInfoUser : closeAside)} className="icon-button">
          {asideRightState?.infoUser ? <BackArrow /> : <XIcon />}
        </button>
        <h3 className="search-title">
          {asideRightState?.search && 'Buscar mensajes'}
          {asideRightState?.infoUser && 'Info. del contacto'}
          {asideRightState?.infoChat && chat?.admin && !asideRightState.infoUser && 'Info. del grupo'}
          {asideRightState?.infoChat && !chat?.admin && 'Info. del contacto'}
        </h3>
      </header>
  )
}
