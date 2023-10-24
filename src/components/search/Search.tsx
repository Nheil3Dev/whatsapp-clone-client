import { useId, useState } from 'react'
import { ArrowDown2Icon } from '../icons/ArrowDown2Icon'
import { SearchIcon } from '../icons/SearchIcon'
import './Search.css'

interface SearchProps {
  placeholder: string;
  setFilter: (prop: string) => void;
  actived?: boolean;
}

export function Search ({ placeholder, setFilter, actived }: SearchProps) {
  const [isActive, setIsActive] = useState(actived ?? false)
  const [text, setText] = useState<string>('')
  const id = useId()
  console.log('isActive', isActive)
  return (
    <search>
      <div className='arrow-search-container'>
        <span
          onClick={() => setIsActive(false)}
          className={isActive ? 'arrow-search actived-search' : 'arrow-search'}
        >
          <ArrowDown2Icon />
        </span>
      </div>

      <label htmlFor={id} onClick={() => setIsActive(true)}>
        <span
          className={isActive ? 'search-icon actived-search' : 'search-icon'}
        >
          <SearchIcon />
        </span>
      </label>
      <input
        id={id}
        value={text}
        autoFocus={isActive}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
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
