import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import { EmojiIcon } from './icons/EmojiIcon'
import { PlusIcon } from './icons/PlusIcon'
import { SendIcon } from './icons/SendIcon'
export function ChatForm () {
  const [active, setActive] = useState(false)
  return (
    <footer>
      {active && (
        <span className="emoji-picker-container">
          <EmojiPicker
            width="100%"
            height="400px"
            previewConfig={{ showPreview: false }}
          />
        </span>
      )}
      <form>
        <div className="icon-container">
          <button
            className="form-button"
            type="button"
            onClick={() => setActive(!active)}
          >
            <EmojiIcon />
          </button>
          <PlusIcon />
        </div>
        <input
          className="input-text"
          type="text"
          placeholder="Escribe un mensaje"
          autoComplete="off"
        />
        <button className="form-button" type="submit">
          <SendIcon />
        </button>
      </form>
    </footer>
  )
}
