import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { FilterIcon } from '../../icons/FilterIcon'
import { Search } from '../../search/Search'
import { ChatItem } from './ChatItem'
import './ChatList.css'
import { ChatListHeader } from './ChatListHeader'

interface ChatListProps {
  setVisibleProfile: (prop: boolean) => void;
  setVisibleNewChat: (prop: boolean) => void
}

export function ChatList ({ setVisibleProfile, setVisibleNewChat }: ChatListProps) {
  const { chats } = useContext(ChatContext)
  return (
    <section className="principal-aside">
      <ChatListHeader setVisibleProfile={setVisibleProfile} setVisibleNewChat={setVisibleNewChat} />
      <section className="chat-list-container">
        <div className='chat-list-filter'>
          <Search placeholder='Busca un chat' />
          <button className="icon-button" title="Filtro de chats no leídos">
            <FilterIcon />
          </button>
        </div>
        <ul className="chat-list">
          {
            chats?.map(chat => (
              <ChatItem key={chat.id} chat={chat} />
            ))
          }
        </ul>
      </section>
    </section>
  )
}
