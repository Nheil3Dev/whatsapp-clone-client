import EmojiPicker from 'emoji-picker-react'
import { useChatForm } from '../../../../../hooks/useChatForm'
import { SendIcon } from '../../../../lib/icons/SendIcon'
import './ChatForm.css'
import { ChatFormIcons } from './ChatFormIcons'

export function ChatForm () {
  const {
    message,
    setMessage,
    activedButtons,
    setActivedButtons,
    inputRef,
    handleEmoji,
    handleSubmit
  } = useChatForm()

  const className = activedButtons.emojis ? 'emoji-picker-container active' : 'emoji-picker-container'

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
        <ChatFormIcons active={activedButtons} setActive={setActivedButtons} />
        <input
          ref={inputRef}
          className="input-text"
          type="text"
          placeholder="Escribe un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button onClick={handleSubmit} className="icon-button" type="submit">
          <SendIcon />
        </button>
      </form>
    </footer>
  )
}
