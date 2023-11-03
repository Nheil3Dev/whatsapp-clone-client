import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import './Emoji.css'

interface EmojiProps {
  active: boolean,
  handleEmoji: (emojiObject: EmojiClickData) => void
}

export function Emoji ({ active, handleEmoji }: EmojiProps) {
  const className = active ? 'emoji active' : 'emoji'
  if (!active) return null
  return (
    <span className={className}>
      <EmojiPicker
        onEmojiClick={handleEmoji}
        width="100%"
        previewConfig={{ showPreview: false }}
      />
    </span>
  )
}
