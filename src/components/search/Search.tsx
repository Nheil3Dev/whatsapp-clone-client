import { ClipLoader } from 'react-spinners'
import { useSearch } from '../../hooks/useSearch'
import { ArrowDown2Icon } from '../icons/ArrowDown2Icon'
import { SearchIcon } from '../icons/SearchIcon'
import { XIcon } from '../icons/XIcon'
import './Search.css'

interface SearchProps {
  placeholder: string;
  setFilter: (prop: string) => void;
  visible?: boolean;
  isLoading: boolean
}

export function Search ({ placeholder, setFilter, visible, isLoading = false }: SearchProps) {
  const {
    handleArrow,
    handleBlur,
    clearInput,
    handleChange,
    id,
    isActive,
    inputRef,
    setIsActive,
    text
  } = useSearch(visible ?? false, setFilter)

  return (
    <search className='common-search'>
      <div className='arrow-search-container'>
        <span
          onClick={handleArrow}
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
        ref={inputRef}
        value={text}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
      />
      {isLoading &&
        <ClipLoader
          color="#00a884"
          cssOverride={{ position: 'absolute', top: '1rem', right: '1.5rem' }}
          size={15}
        />}
      {!isLoading && text.length > 0 &&
        <button className='clean-button' onClick={clearInput}>
          <XIcon />
        </button>
      }
    </search>
  )
}
