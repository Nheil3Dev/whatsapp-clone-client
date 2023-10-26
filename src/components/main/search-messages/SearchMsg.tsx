import { Suspense } from 'react'
import { useMessages } from '../../../hooks/useMessages'
import { XIcon } from '../../icons/XIcon'
import { Search } from '../../search/Search'
import { FilteredMsgList } from './FilteredMsgList'
import './SearchMsg.css'

interface SearchMsgProps {
  visible: boolean
  onClose: () => void
}

export function SearchMsg ({ visible, onClose }: SearchMsgProps) {
  const { filter, setFilter, isLoading, deferredFilteredMsgs } = useMessages()

  // const filteredMsg = (messages: IMessage[]) => {
  //   return messages.filter(msg => msg.content.toLowerCase().includes(filter.toLowerCase()))
  // }

  return (
    <aside className={visible ? 'search-msg visible-search' : 'search-msg'}>
      <header className='search-msg-header'>
        <button onClick={() => onClose()} className="icon-button">
          <XIcon />
        </button>
        <h3 className="search-title">Buscar mensajes</h3>
      </header>
      <section className="search-container">
        <Search placeholder='Buscar...' setFilter={setFilter} isLoading={isLoading} visible={visible} />
        <Suspense fallback={<p>Cargando...</p>}>
          <FilteredMsgList filteredMsgs={deferredFilteredMsgs} active={filter.length > 1} filter={filter} />
        </Suspense>
      </section>
    </aside>
  )
}
