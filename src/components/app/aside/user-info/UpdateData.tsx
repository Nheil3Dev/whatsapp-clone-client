import { EmojiClickData } from 'emoji-picker-react'
import { FormEvent, FormEventHandler } from 'react'
import { Emoji } from '../../../lib/emoji/Emoji'
import { CheckIcon } from '../../../lib/icons/CheckIcon'
import { EmojiIcon } from '../../../lib/icons/EmojiIcon'
import './UpdateData.css'

interface UpdateDataProps {
  value: string
  handleChange: (prop: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => (boolean|Promise<boolean>)
  handleClick: () => void
  handleEmoji: (emojiObject: EmojiClickData) => void
  activeEmoji: boolean
  handleVisibleEmoji: () => void
  maxLength: number
}

export function UpdateData ({ value, handleChange, handleClick, handleSubmit, handleEmoji, activeEmoji, handleVisibleEmoji, maxLength }: UpdateDataProps) {
  const handleSubmitSpecific: FormEventHandler<HTMLFormElement> = async (e) => {
    const response = await handleSubmit(e)
    if (response) {
      handleClick()
    }
  }
  return (
    <form className='upload-form' onSubmit={handleSubmitSpecific}>
      <Emoji active={activeEmoji} handleEmoji={handleEmoji} />
      <input
        className='upload-input'
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={maxLength}
      />
      <div className='upload-icon-container'>
        {maxLength - value.length <= 5 && <span className='length'>{maxLength - value.length}</span>}
        <button type='button' className='icon-button' onClick={handleVisibleEmoji}>
          <EmojiIcon />
        </button>
        <button className='icon-button'>
          <CheckIcon />
        </button>
      </div>
    </form>
  )
}
