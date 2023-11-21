import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { MainContext } from '../../../../context/mainContext'
import { UserContext } from '../../../../context/userContext'
import { IUser } from '../../../../types/types'
import { UserImg } from '../../../lib/image/UserImg'

interface ContactItemProps {
  contact: IUser
}

export function ContactItem ({ contact }: ContactItemProps) {
  const { addNewChat } = useContext(ChatContext)
  const { closeContain } = useContext(MainContext)
  const { user } = useContext(UserContext)

  return (
    <li className='chat-item' onClick={async () => {
      await addNewChat(contact)
      closeContain()
    }}>
      <UserImg className='img' user={contact} />
      <div className='info-chat-container'>
        <div className='title-chat-container'>
          <h3
            className="title-chat-list text-ellipsis"
            title={contact.alias}
          >
            {contact.alias === user?.alias ? 'Tú' : contact.alias}
          </h3>
        </div>
        <div className='last-msg-container'>
          <p className='text-ellipsis'>
            {contact.info}
          </p>
        </div>
      </div>
    </li>
  )
}
