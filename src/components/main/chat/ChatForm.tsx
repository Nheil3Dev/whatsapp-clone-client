import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { sendMessage } from '../../../services/sendMessage'
import { EmojiIcon } from '../../icons/EmojiIcon'
import { PlusIcon } from '../../icons/PlusIcon'
import { SendIcon } from '../../icons/SendIcon'
import { XIcon } from '../../icons/XIcon'
import './ChatForm.css'

export function ChatForm () {
  const [message, setMessage] = useState<string>('')
  const [active, setActive] = useState({
    emojis: false,
    x: false
  })
  const handleEmoji = (emojiObject: EmojiClickData) => {
    setMessage(prevText => prevText + emojiObject.emoji)
  }
  const className = active.emojis ? 'emoji-picker-container active' : 'emoji-picker-container'
  return (
    <footer>
        <span className={className}>
          <EmojiPicker
            onEmojiClick={handleEmoji}
            width="100%"
            previewConfig={{ showPreview: false }}
          />
        </span>

      <form>
        <div className="icon-container">
          <button
            className={active.emojis ? 'icon-button active-x' : 'icon-button'}
            type='button'
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
          <button onClick={() => setActive({ ...active, x: !active.x })} className={active.x ? 'icon-button active-x' : 'icon-button'} type='button'>
            <PlusIcon />
          </button>
        </div>
        <input
          className="input-text"
          type="text"
          placeholder="Escribe un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button onClick={async (e) => {
          e.preventDefault()

          if (message.length > 0) {
            sendMessage(message)
            setMessage('')
            setActive({ emojis: false, x: false })
          }
        }} className="icon-button" type="submit">
          <SendIcon />
        </button>
      </form>
    </footer>
  )
}
