import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { IChat } from '../../../../types/types'

interface ChatItemDropdownProps {
  chat: IChat
}

export function ChatItemDropdown ({ chat }: ChatItemDropdownProps) {
  const { delChat } = useContext(ChatContext)
  const { openDialog } = useContext(MainContext)
  return (
    <>
      <p onClick={(e) => {
        e.stopPropagation()
        openDialog('chat', () => delChat(chat.id, chat.admin ? 'group' : 'conversation'))
      }}>
        Eliminar chat
      </p>
      <p onClick={(e) => e.stopPropagation()}>
        Marcar como leído
      </p>
      <p onClick={(e) => e.stopPropagation()}>Fijar chat</p>
    </>
  )
}
