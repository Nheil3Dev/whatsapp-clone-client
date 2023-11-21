import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { IMessage } from '../../../../../types/types'

interface MessageDropdownProps {
  msg: IMessage
  isMyMessage: boolean
  closeDropdown: () => void
}

export function MessageDropdown ({ msg, isMyMessage, closeDropdown }: MessageDropdownProps) {
  const { deleteMsg, setEditMsg } = useContext(ChatContext)
  return (
    <>
      <p>Enviar mensaje a {isMyMessage ? 'Ti' : msg.alias}</p>
      {isMyMessage
        ? <p onClick={() => deleteMsg(msg.id ?? 0)}>Eliminar mensaje</p>
        : <p>Responder</p>
          }
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
    </>
  )
}
