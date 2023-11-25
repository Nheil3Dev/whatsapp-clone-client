import { EmojiClickData } from 'emoji-picker-react'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { clearEdit } from '../actions/chatActions'
import { ChatContext } from '../context/chatContext'
import { SocketContext } from '../context/socketContext'

export function useChatForm () {
  const { chatState, dispatchChat } = useContext(ChatContext)
  const { modifyMessage, sendMessage } = useContext(SocketContext)
  const { chat, activeChat, editMsgId } = chatState
  const [message, setMessage] = useState<string>('')
  const [activedButtons, setActivedButtons] = useState({
    emojis: false,
    x: false
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEmoji = (emojiObject: EmojiClickData) => {
    setMessage(prevText => prevText + emojiObject.emoji)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (message.length > 0) {
      if (editMsgId !== 0) {
        modifyMessage(editMsgId, message, chat.id)
        dispatchChat(clearEdit)
      } else {
        sendMessage(message, chat.id, chat.admin ? 'group' : 'conversation')
      }
      setMessage('')
      setActivedButtons({ emojis: false, x: false })
    }
  }

  useEffect(() => {
    if (activeChat === '') return
    if (editMsgId !== 0) {
      const newMsg = chat?.messages.filter(m => m.id === editMsgId)[0].content
      setMessage(newMsg)
    }
    if (editMsgId === 0) {
      setMessage('')
    }
    inputRef.current && inputRef.current.focus()
  }, [activeChat, editMsgId])

  return { message, setMessage, activedButtons, setActivedButtons, inputRef, handleEmoji, handleSubmit }
}
