import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { sendMessage } from '../../../../../services/sendMessage'
import { SendIcon } from '../../../../lib/icons/SendIcon'
import './ChatForm.css'
import { ChatFormIcons } from './ChatFormIcons'

export function ChatForm () {
  const { chat, activeChat, editMsg, editMessage } = useContext(ChatContext)
  const [message, setMessage] = useState<string>('')
  const [active, setActive] = useState({
    emojis: false,
    x: false
  })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeChat === '') return
    if (editMsg !== 0) {
      const newMsg = chat?.messages.filter(m => m.id === editMsg)[0].content
      setMessage(newMsg)
    }
    if (editMsg === 0) {
      setMessage('')
    }
    inputRef.current && inputRef.current.focus()
  }, [activeChat, editMsg])

  const handleEmoji = (emojiObject: EmojiClickData) => {
    setMessage(prevText => prevText + emojiObject.emoji)
  }
  const className = active.emojis ? 'emoji-picker-container active' : 'emoji-picker-container'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (message.length > 0) {
      if (editMsg !== 0) {
        editMessage(message)
      } else {
        sendMessage(message, chat.id, chat.admin ? 'group' : 'conversation')
      }
      setMessage('')
      setActive({ emojis: false, x: false })
    }
  }
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
