import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { IMessage } from '../../../../../types/types'

interface MessageDropdownProps {
  msg: IMessage
  isMyMessage: boolean
  closeDropdown: () => void
}

export function MessageDropdown ({ msg, isMyMessage, closeDropdown }: MessageDropdownProps) {
  const { deleteMsg, setEditMsg } = useContext(ChatContext)
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
        ? <p onClick={() => openDialog('msg', () => deleteMsg(msg.id ?? 0))}>Eliminar mensaje</p>
        : <p>Enviar mensaje a {msg.alias}</p>}
    </>
  )
}
