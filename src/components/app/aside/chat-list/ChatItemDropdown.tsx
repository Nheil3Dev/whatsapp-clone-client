import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { IChat } from '../../../../types/types'

interface ChatItemDropdownProps {
  chat: IChat
}

export function ChatItemDropdown ({ chat }: ChatItemDropdownProps) {
  const { delChat } = useContext(ChatContext)
  return (
    <>
      <p onClick={() => delChat(chat.id, chat.admin ? 'group' : 'conversation')}>Eliminar chat</p>
      <p onClick={(e) => e.stopPropagation()}>Marcar como leído</p>
      <p onClick={(e) => e.stopPropagation()}>Fijar chat</p>
    </>
  )
}
