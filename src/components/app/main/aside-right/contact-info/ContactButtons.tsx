import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { BlockIcon } from '../../../../lib/icons/BlockIcon'
import { DislikeIcon } from '../../../../lib/icons/DislikeIcon'
import { TrashIcon } from '../../../../lib/icons/TrashIcon'
import './ContactButtons.css'

interface ContactButtonsProps {
  alias: string
}

// TODO: En ContactInfo no funciona el borrar el chat, ya que no podemos obtener el id de la supuesta conversación
// porque el chat seleccionado pertenece al grupo y en este componente vemos los perfiles de los usuarios del grupo.

export function ContactButtons ({ alias }: ContactButtonsProps) {
  const { chatState, delChat } = useContext(ChatContext)
  const { openDialog } = useContext(MainContext)
  return (
    <div className="info-button-container">
      <button className="info-button" onClick={() => alert('No seas tóxic@...')}>
        <BlockIcon />
        Bloquear a {alias}
      </button>
      <button className="info-button" onClick={() => alert('No seas tóxic@...')}>
        <DislikeIcon />
        Reportar a {alias}
      </button>
      <button className="info-button" onClick={() => openDialog('chat', () => delChat(chatState.chat.id, 'conversation'))}>
        <TrashIcon />
        Eliminar chat
      </button>
    </div>
  )
}
