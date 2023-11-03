import { CheckIcon } from '../../../lib/icons/CheckIcon'
import { EmojiIcon } from '../../../lib/icons/EmojiIcon'
import './InputButtons.css'

interface InputButtonsProps {
  value: string
  maxLength: number
  handleVisibleEmoji: () => void
}

export function InputButtons ({ value, maxLength, handleVisibleEmoji }: InputButtonsProps) {
  return (
    <div className='upload-icon-container'>
        {maxLength - value.length <= 5 && <span className='length'>{maxLength - value.length}</span>}
        <button type='button' className='icon-button' onClick={handleVisibleEmoji}>
          <EmojiIcon />
        </button>
        <button className='icon-button'>
          <CheckIcon />
        </button>
      </div>
  )
}
