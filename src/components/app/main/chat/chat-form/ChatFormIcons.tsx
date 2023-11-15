import { useDropdown } from '../../../../../hooks/useDropDown'
import { EmojiIcon } from '../../../../lib/icons/EmojiIcon'
import { PlusIcon } from '../../../../lib/icons/PlusIcon'
import { XIcon } from '../../../../lib/icons/XIcon'
import './ChatFormIcons.css'
import { Options } from './Options'

interface ChatFormIconsProps {
  active: {
    emojis: boolean
    x: boolean
  }
  setActive: (active: { emojis: boolean, x: boolean}) => void
}

export function ChatFormIcons ({ active, setActive }: ChatFormIconsProps) {
  const { dropdownOpened, dropdownRef, toggleDropdown, buttonRef } = useDropdown()
  return (
    <div className="icon-container">
      <button
        className={active.emojis ? 'icon-button active-x' : 'icon-button'}
        type="button"
        onClick={() => {
          setActive({ emojis: false, x: false })
        }}
      >
        <XIcon />
      </button>
      <button
        className={active.emojis ? 'icon-button active-emoji' : 'icon-button'}
        type="button"
        onClick={() => {
          setActive({ emojis: true, x: false })
        }}
      >
        <EmojiIcon />
      </button>
      <button
        ref={buttonRef}
        onClick={() => {
          setActive({ ...active, x: !active.x })
          toggleDropdown()
        }}
        className={dropdownOpened ? 'icon-button active-x' : 'icon-button'}
        type="button"
      >
        <PlusIcon />
      </button>
      {dropdownOpened && <Options ref={dropdownRef} />}
    </div>
  )
}
