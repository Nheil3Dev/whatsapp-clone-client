import { useContext } from 'react'
import { closeNewChat } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { ChatContext } from '../../../../context/chatContext'
import { useNewGroup } from '../../../../hooks/useNewGroup'
import { IUser } from '../../../../types/types'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import './UserItem.css'

interface UserItemProps {
  user: IUser
}

export function UserItem ({ user }: UserItemProps) {
  const { asideState, dispatch } = useContext(AsideContext)
  const { chats, setActiveChat, addNewChat } = useContext(ChatContext)
  const { addUser } = useNewGroup()

  const handleClick = async (user: IUser) => {
    if (asideState.newGroup) { // NewGroup
      addUser(user)
    } else { // NewChat
      // Comprueba si tenemos ya un chat con ese contacto
      const newActiveChat = chats?.filter(chat => chat.name === user.alias)[0]
      if (newActiveChat) {
        setActiveChat(newActiveChat.id)
      // Creamos un chat nuevo
      } else {
        await addNewChat(user)
      }
      dispatch(closeNewChat)
    }
  }
  return (
    <div className="user-item-container" onClick={async () => await handleClick(user)}>
      <div className='user-item-avatar'>
        <UserDefaultAvatar />
      </div>
      <div className='user-item-info'>
        <h5>{user.alias}</h5>
        <p>{user.info}</p>
      </div>
    </div>
  )
}
