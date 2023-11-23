import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'

interface ChatHeaderDropdownProps {
  closeDropdown: () => void
}

export function ChatHeaderDropdown ({ closeDropdown }: ChatHeaderDropdownProps) {
  const { chat, setActiveChat, delChat } = useContext(ChatContext)
  const { openInfo, closeAside, openDialog } = useContext(MainContext)
  return (
    <>
      <p onClick={() => {
        openInfo()
        closeDropdown()
      }}>
        Info. del {chat?.admin ? 'grupo' : 'contacto'}
      </p>
      <p onClick={() => {
        setActiveChat('')
        closeDropdown()
        closeAside()
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
