import { useContext } from 'react'
import { closeAside, openInfo } from '../../../../actions/asideRightActions'
import { closeChat } from '../../../../actions/chatActions'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'

interface ChatHeaderDropdownProps {
  closeDropdown: () => void
}

export function ChatHeaderDropdown ({ closeDropdown }: ChatHeaderDropdownProps) {
  const { chatState, dispatchChat, delChat } = useContext(ChatContext)
  const { dispatchAsideRight, openDialog } = useContext(MainContext)
  const { chat } = chatState
  return (
    <>
      <p onClick={() => {
        dispatchAsideRight(openInfo)
        closeDropdown()
      }}>
        Info. del {chat?.admin ? 'grupo' : 'contacto'}
      </p>
      <p onClick={() => {
        dispatchChat(closeChat)
        closeDropdown()
        dispatchAsideRight(closeAside)
      }}>
        {chat?.admin ? 'Cerrar grupo' : 'Cerrar chat'}
      </p>
      <p onClick={(e) => {
        e.stopPropagation()
        openDialog('chat', () => delChat(chat.id, chat.admin ? 'group' : 'conversation'))
      }}>
        {chat?.admin ? 'Abandonar grupo' : 'Eliminar chat'}
      </p>
    </>
  )
}
