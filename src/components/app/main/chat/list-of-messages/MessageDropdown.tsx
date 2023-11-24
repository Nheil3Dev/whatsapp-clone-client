import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { SocketContext } from '../../../../../context/socketContext'
import { IMessage } from '../../../../../types/types'

interface MessageDropdownProps {
  msg: IMessage
  isMyMessage: boolean
  closeDropdown: () => void
}

export function MessageDropdown ({ msg, isMyMessage, closeDropdown }: MessageDropdownProps) {
  const { deleteMessage } = useContext(SocketContext)
  const { setEditMsg } = useContext(ChatContext)
  const { openDialog } = useContext(MainContext)
  return (
    <>
      <p>Responder</p>
      {isMyMessage
        ? <p onClick={() => {
          setEditMsg(msg.id ?? 0)
          closeDropdown()
        }}
        >
          Editar mensaje
        </p>
        : <p>Responder en privado</p>
      }
      {isMyMessage
        ? <p onClick={() => openDialog('msg', () => deleteMessage(msg.id ?? 0, msg.conversationId || msg.groupId || ''))}>Eliminar mensaje</p>
        : <p>Enviar mensaje a {msg.alias}</p>}
    </>
  )
}
