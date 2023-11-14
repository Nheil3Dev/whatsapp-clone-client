import { IChat, IUser } from '../../../../types/types'
import { ChatItem } from './ChatItem'
import './ChatListFiltered.css'
import { ContactItem } from './ContactItem'

interface ChatListFilteredProps {
  filteredUsers: {
    contacts: IUser[]
    conversations: IChat[]
    groups: IChat[]
  }
}

export function ChatListFiltered ({ filteredUsers }: ChatListFilteredProps) {
  const { contacts, conversations, groups } = filteredUsers
  return (
    <>
      {contacts.length > 0 && <span className='title-list'>CONTACTOS</span>}
      {
        contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      }
      {conversations.length > 0 && <span className='title-list'>CHATS</span>}
      {
        conversations.map(conversation => (
          <ChatItem key={conversation.id} chat={conversation} />
        ))
      }
      {groups.length > 0 && <span className='title-list'>GRUPOS EN COMÚN</span>}
      {
        groups.map(group => (
          <ChatItem key={group.id} chat={group} />
        ))
      }
    </>
  )
}
