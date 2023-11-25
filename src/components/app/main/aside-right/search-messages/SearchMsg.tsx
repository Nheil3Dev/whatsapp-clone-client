import { Suspense, useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { MainContext } from '../../../../../context/mainContext'
import { useMessages } from '../../../../../hooks/useMessages'
import { Search } from '../../../../lib/search/Search'
import { FilteredMsgList } from './FilteredMsgList'
import './SearchMsg.css'

export function SearchMsg () {
  const { chatState } = useContext(ChatContext)
  const { filter, setFilter, isLoading, deferredFilteredMsgs } = useMessages(chatState.chat?.id)
  const { asideRightState } = useContext(MainContext)
  const [className, setClassName] = useState('search-msg')

  useEffect(() => {
    setTimeout(() => setClassName('search-msg visible-search'), 10)
  }, [])

  return (
    <div className={className}>
      <section className="search-container">
        <Search placeholder='Buscar...' setFilter={setFilter} isLoading={isLoading} visible={asideRightState?.search} />
        <Suspense fallback={<p>Cargando...</p>}>
          <FilteredMsgList filteredMsgs={deferredFilteredMsgs} active={filter.length > 1} filter={filter} />
        </Suspense>
      </section>
    </div>
  )
}
