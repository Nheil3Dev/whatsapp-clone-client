import { useContext } from 'react'
import { selectEditMsg } from '../../../../../actions/chatActions'
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
  const { dispatchChat } = useContext(ChatContext)
  const { openDialog } = useContext(MainContext)
  return (
    <>
      <p>Responder</p>
      {isMyMessage
        ? <p onClick={() => {
          dispatchChat(selectEditMsg(msg.id ?? 0))
          closeDropdown()
        }}
        >
          Editar mensaje
        </p>
        : <p>Responder en privado</p>
      }
      {isMyMessage
        ? <p onClick={() => {
          openDialog('msg', () => deleteMessage(msg.id ?? 0, msg.conversationId || msg.groupId || ''))
          dispatchChat(selectEditMsg(0))
        }}>
           Eliminar mensaje
          </p>
        : <p>Enviar mensaje a {msg.alias}</p>}
    </>
  )
}
