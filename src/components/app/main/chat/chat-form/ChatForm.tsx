import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { sendMessage } from '../../../../../services/sendMessage'
import { SendIcon } from '../../../../lib/icons/SendIcon'
import './ChatForm.css'
import { ChatFormIcons } from './ChatFormIcons'

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
        <ChatFormIcons active={active} setActive={setActive} />
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
