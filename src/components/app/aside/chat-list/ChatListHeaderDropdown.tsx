import { useContext } from 'react'
import { openNewChat, openNewGroup } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { ChatContext } from '../../../../context/chatContext'
import { SocketContext } from '../../../../context/socketContext'
import { UserContext } from '../../../../context/userContext'

interface ChatListHeaderDropdownProps {
  closeDropdown: () => void
}

export function ChatListHeaderDropdown ({ closeDropdown }: ChatListHeaderDropdownProps) {
  const { socket } = useContext(SocketContext)
  const { clearUser } = useContext(UserContext)
  const { setActiveChat } = useContext(ChatContext)
  const { dispatch } = useContext(AsideContext)

  return (
    <>
      <p onClick={() => {
        dispatch(openNewChat)
        closeDropdown()
      }}>
        Nuevo mensaje
      </p>

      <p onClick={() => {
        dispatch(openNewGroup)
        closeDropdown()
      }}>
        Nuevo grupo
      </p>

      <p onClick={() => {
        socket.disconnect()
        clearUser()
        setActiveChat('')
        closeDropdown()
      }}>
        Cerrar sesión
      </p>
    </>
  )
}
