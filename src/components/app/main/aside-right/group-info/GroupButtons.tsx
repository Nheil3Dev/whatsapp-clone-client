import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { DislikeIcon } from '../../../../lib/icons/DislikeIcon'
import { OutIcon } from '../../../../lib/icons/OutIcon'
import './GroupButtons.css'

export function GroupButtons () {
  const { chatState, delChat } = useContext(ChatContext)
  const { openDialog } = useContext(MainContext)
  const type = chatState.chat.admin ? 'group' : 'conversation'
  return (
    <div className='group-info-button-container'>
          <button className="info-button" onClick={() => openDialog('chat', () => delChat(chatState.chat.id, type))}>
            <OutIcon />
            Salir del grupo
          </button>
          <button className="info-button" onClick={() => alert('No seas tóxic@...')}>
            <DislikeIcon />
            Reportar grupo
          </button>
        </div>
  )
}
