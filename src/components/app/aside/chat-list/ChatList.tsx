import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../context/chatContext'
import { SocketContext } from '../../../../context/socketContext'
import { UserContext } from '../../../../context/userContext'
import { FilterIcon } from '../../../lib/icons/FilterIcon'
import { Search } from '../../../lib/search/Search'
import { ChatItem } from './ChatItem'
import './ChatList.css'
import { ChatListFiltered } from './ChatListFiltered'
import { ChatListHeader } from './ChatListHeader'

const getSearch = async (filter: string, userId: string) => {
  return await fetch(`http://localhost:1234/api/users/${filter}?userId=${userId}`)
    .then(res => res.json())
}

export function ChatList () {
  const { isConnected } = useContext(SocketContext)
  const { chats } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const [filter, setFilter] = useState<string>('')
  const [filteredUsers, setFilteredUsers] = useState({
    contacts: [],
    conversations: [],
    groups: []
  })

  useEffect(() => {
    if (filter.length === 0 || !user) return
    const id = setTimeout(() => {
      getSearch(filter, user?.id)
        .then(res => {
          setFilteredUsers(res)
        })
    }, 300)
    return () => clearTimeout(id)
  }, [filter, user])
  return (
    <section className="principal-aside">
      <ChatListHeader />
      <section className="chat-list-container">
        {isConnected &&
          <>
            <div className='chat-list-filter'>
              <Search
                placeholder='Busca un chat o inicia uno nuevo'
                setFilter={setFilter}
                visible={false}
                isLoading={false}
              />
              <button className="icon-button" title="Filtro de chats no leídos">
                <FilterIcon />
              </button>
            </div>
            <ul className="chat-list">
              {
                filter.length === 0
                  ? chats.map(chat => (
                    <ChatItem key={chat.id} chat={chat} />
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
