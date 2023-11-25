import { useContext } from 'react'
import { clearEdit } from '../../../../../actions/chatActions'
import { ChatContext } from '../../../../../context/chatContext'
import { XIcon } from '../../../../lib/icons/XIcon'
import './ChatFormEdit.css'

export function ChatFormEdit () {
  const { chatState, dispatchChat } = useContext(ChatContext)
  const { chat, editMsgId } = chatState

  if (editMsgId === 0) return
  return (
      <div className='edit-msg-container'>
        <header className='edit-msg-header'>
          <button className='icon-button' onClick={() => {
            dispatchChat(clearEdit)
          }}>
            <XIcon />
          </button>
          <h5>Editar mensaje</h5>
        </header>
        <article className='edit-msg'>
          <div className='msg'>
            {chat?.messages.filter(msg => msg.id === editMsgId)[0]?.content}
          </div>
        </article>
      </div>

  )
}
