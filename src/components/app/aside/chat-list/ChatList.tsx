import { useContext } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { SocketContext } from '../../../../context/socketContext'
import { useSearchChatList } from '../../../../hooks/useSearchChatList'
import { FilterIcon } from '../../../lib/icons/FilterIcon'
import { Search } from '../../../lib/search/Search'
import { ChatItem } from './ChatItem'
import './ChatList.css'
import { ChatListFiltered } from './ChatListFiltered'
import { ChatListHeader } from './ChatListHeader'
import { WithoutChats } from './WithoutChats'

export function ChatList () {
  const { socketState } = useContext(SocketContext)
  const { chats } = useContext(ChatContext)
  const { filter, setFilter, isLoading, filteredUsers } = useSearchChatList()

  return (
    <section className="principal-aside">
      <ChatListHeader />
      <section className="chat-list-container">
        {socketState.isConnected &&
          <>
            <div className='chat-list-filter'>
              <Search
                placeholder='Busca un chat o inicia uno nuevo'
                setFilter={setFilter}
                visible={false}
                isLoading={isLoading}
              />
              <button className="icon-button" title="Filtro de chats no leídos">
                <FilterIcon />
              </button>
            </div>
            <ul className="chat-list">
              {
                filter.length === 0
                  ? chats.length === 0
                    ? <WithoutChats />
                    : chats.map(chat => (
                      // Muestra las conversaciones con mensajes y los grupos con o sin mensajes
                      (chat.messages.length > 0 || chat.admin) && <ChatItem key={chat.id} chat={chat} />
                    ))
                  : <ChatListFiltered filteredUsers={filteredUsers} />
              }
            </ul>
          </>
        }
      </section>
    </section>
  )
}
