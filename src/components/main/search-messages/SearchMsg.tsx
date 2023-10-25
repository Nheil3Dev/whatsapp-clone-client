import { Suspense, useDeferredValue, useEffect, useState } from 'react'
import { IMessage } from '../../../types/types'
import { XIcon } from '../../icons/XIcon'
import { Search } from '../../search/Search'
import { FilteredMsgList } from './FilteredMsgList'
import './SearchMsg.css'

interface SearchMsgProps {
  visible: boolean
  onClose: () => void
}

export function SearchMsg ({ visible, onClose }: SearchMsgProps) {
  const [filteredMsgs, setFilteredMsgs] = useState<IMessage[]>([])
  const deferredFilteredMsgs = useDeferredValue(filteredMsgs)
  const [filter, setFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (filter.length <= 1) return
    setIsLoading(true)
    fetch(`http://localhost:1234/api/messages?search=${filter}`)
      .then(res => res.json())
      .then(msgs => {
        setFilteredMsgs(msgs)
        setIsLoading(false)
      })
  }, [filter])

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
          <FilteredMsgList filteredMsgs={deferredFilteredMsgs} active={filter.length > 1} />
        </Suspense>
      </section>
    </aside>
  )
}
