import { useState } from 'react'
import { ArrowDown2Icon } from '../icons/ArrowDown2Icon'
import { SearchIcon } from '../icons/SearchIcon'
import './Search.css'

interface SearchProps {
  placeholder: string
}

export function Search ({ placeholder }: SearchProps) {
  const [visibleArrow, setVisibleArrow] = useState(false)
  return (
    <search>
        <label htmlFor="search">
            <button
              className="icon-button"
              onClick={() => setVisibleArrow(!visibleArrow)}
            >
              {!visibleArrow && <SearchIcon />}
              <span className={visibleArrow ? 'arrow-search visible-arrow2' : 'arrow-search'}>
                <ArrowDown2Icon />
              </span>
            </button>
        </label>
        <input
          id="search"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
        />
      </search>
  )
}
