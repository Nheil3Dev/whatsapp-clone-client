import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { XIcon } from '../../../../lib/icons/XIcon'
import './ChatFormEdit.css'

export function ChatFormEdit () {
  const { editMsg, setEditMsg } = useContext(ChatContext)
  const { chat } = useContext(ChatContext)

  if (editMsg === 0) return
  return (
      <div className='edit-msg-container'>
        <header className='edit-msg-header'>
          <button className='icon-button' onClick={() => setEditMsg(0)}>
            <XIcon />
          </button>
          <h5>Editar mensaje</h5>
        </header>
        <article className='edit-msg'>
          <div className='msg'>
            {chat?.messages.filter(msg => msg.id === editMsg)[0]?.content}
          </div>
        </article>
      </div>

  )
}
