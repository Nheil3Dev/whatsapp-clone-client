import { useState } from 'react'
import { IMessage } from '../../../types/types'
import { XIcon } from '../../icons/XIcon'
import { Search } from '../../search/Search'
import { FilteredMsgList } from './FilteredMsgList'
import './SearchMsg.css'

interface SearchMsgProps {
  visible: boolean
  onClose: () => void
  messages: IMessage[]
}

export function SearchMsg ({ visible, onClose, messages }: SearchMsgProps) {
  const [filter, setFilter] = useState<string>('')
  const filteredMsg = (messages: IMessage[]) => {
    return messages.filter(msg => msg.content.toLowerCase().includes(filter.toLowerCase()))
  }
  return (
    <aside className={visible ? 'search-msg visible-search' : 'search-msg'}>
      <header className='search-msg-header'>
        <button onClick={() => onClose()} className="icon-button">
          <XIcon />
        </button>
        <h3 className="search-title">Buscar mensajes</h3>
      </header>
      <section className="search-container">
        <Search placeholder='Buscar...' setFilter={setFilter} />
        <FilteredMsgList filteredMsg={filteredMsg(messages)} active={filter !== ''} />
      </section>
    </aside>
  )
}
