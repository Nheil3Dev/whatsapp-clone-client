import { useId, useState } from 'react'
import { ArrowDown2Icon } from '../icons/ArrowDown2Icon'
import { SearchIcon } from '../icons/SearchIcon'
import './Search.css'

interface SearchProps {
  placeholder: string
  setFilter: (prop: string) => void
}

export function Search ({ placeholder, setFilter }: SearchProps) {
  const [visibleArrow, setVisibleArrow] = useState(false)
  const [text, setText] = useState<string>('')
  const id = useId()
  return (
    <search>
        <label htmlFor={id}>
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
          id={id}
          value={text}
          onChange={(e) => {
            if (e.target.value === ' ') return
            if (e.target.value.includes('  ')) return
            setFilter(e.target.value)
            setText(e.target.value)
          }}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
        />
      </search>
  )
}
