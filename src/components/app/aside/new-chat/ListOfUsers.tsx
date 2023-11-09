import { useContext } from 'react'
import { closeNewChat } from '../../../../actions/asideActions'
import { AsideContext } from '../../../../context/asideContext'
import { ChatContext } from '../../../../context/chatContext'
import { IUser } from '../../../../types/types'
import './ListOfUsers.css'
import { UserItem } from './UserItem'

interface ListOfUsersProps {
  filteredUsers: IUser[],
  addUser?: (user: IUser) => void // NewGroup
}

export function ListOfUsers ({ filteredUsers, addUser }: ListOfUsersProps) {
  const { chats, setActiveChat } = useContext(ChatContext)
  const { dispatch } = useContext(AsideContext)
  const orderedFilteredUsers: { values: IUser[] } = Object.groupBy(filteredUsers, (user: IUser) => user.alias[0])
  const handleClick = (user: IUser) => {
    if (addUser) { // NewGroup
      addUser(user)
    } else { // NewChat
      // Si tenemos ya un chat con ese contacto
      const newActiveChat = chats?.filter(chat => chat.name === user.alias)
      if (newActiveChat) {
        setActiveChat(newActiveChat[0]?.id)
        // TODO: Crear una nueva conversación
      } else {
        setActiveChat('')
      }
      dispatch(closeNewChat)
    }
  }
  return (
    <>
      {
        Object.entries(orderedFilteredUsers).map(([letter, users]) => (
          <div className='letter-users-group' key={letter}>
            <span className='letter'>{letter}</span>
            {
              users.map(user => (
                <UserItem key={user.id} user={user} onClick={() => handleClick(user)} />
              ))
            }
            </div>
        )
        )
      }
    </>
  )
}