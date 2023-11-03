import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { XIcon } from '../../../lib/icons/XIcon'
import './HeaderAsideRight.css'

export function HeaderAsideRight () {
  const { visible, closeInfoUser, closeAside } = useContext(MainContext)
  const { chat } = useContext(ChatContext)
  return (
    <header className='aside-right-header'>
        <button onClick={visible?.infoUser ? closeInfoUser : closeAside} className="icon-button">
          {visible?.infoUser ? <BackArrow /> : <XIcon />}
        </button>
        <h3 className="search-title">
          {visible?.search && 'Buscar mensajes'}
          {visible?.infoUser && 'Info. del contacto'}
          {visible?.infoChat && chat?.admin && !visible.infoUser && 'Info. del grupo'}
          {visible?.infoChat && !chat?.admin && 'Info. del contacto'}
        </h3>
      </header>
  )
}
