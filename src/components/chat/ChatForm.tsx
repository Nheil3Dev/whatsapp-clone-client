import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { socket } from '../../hooks/useSocketIo'
import { EmojiIcon } from '../icons/EmojiIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { SendIcon } from '../icons/SendIcon'
import { XIcon } from '../icons/XIcon'
import './ChatForm.css'

export function ChatForm () {
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState<string>('')
  const handleEmoji = (emojiObject: EmojiClickData) => {
    setMessage(prevText => prevText + emojiObject.emoji)
  }
  return (
    <footer>
      {active && (
        <span className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={handleEmoji}
            width="100%"
            height="320px"
            previewConfig={{ showPreview: false }}
          />
        </span>
      )}
      <form>
        <div className="icon-container">
          <button
            className='icon-button'
            type='button'
            onClick={() => setActive(false)}
          >
            <XIcon />
          </button>
          <button
            className={active ? 'icon-button active-emoji' : 'icon-button'}
            type="button"
            onClick={() => setActive(true)}
          >
            <EmojiIcon />
          </button>
          <button className='icon-button' type='button'>
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
            const date = new Date()
            const formatDate = date.toISOString().slice(0, 19).replace('T', ' ')
            socket.emit('whatsapp clone msg', message, formatDate)
            setMessage('')
            setActive(false)
          }
        }} className="icon-button" type="submit">
          <SendIcon />
        </button>
      </form>
    </footer>
  )
}
