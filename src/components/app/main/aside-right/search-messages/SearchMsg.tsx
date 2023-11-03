import { Suspense, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { useMessages } from '../../../../../hooks/useMessages'
import { Search } from '../../../../lib/search/Search'
import { FilteredMsgList } from './FilteredMsgList'
import './SearchMsg.css'

export function SearchMsg () {
  const { filter, setFilter, isLoading, deferredFilteredMsgs } = useMessages()
  const { visible } = useContext(MainContext)
  const [className, setClassName] = useState('search-msg')

  useEffect(() => {
    setTimeout(() => setClassName('search-msg visible-search'), 10)
  }, [])

  return (
    <div className={className}>
      <section className="search-container">
        <Search placeholder='Buscar...' setFilter={setFilter} isLoading={isLoading} visible={visible?.search} />
        <Suspense fallback={<p>Cargando...</p>}>
          <FilteredMsgList filteredMsgs={deferredFilteredMsgs} active={filter.length > 1} filter={filter} />
        </Suspense>
      </section>
    </div>
  )
}
