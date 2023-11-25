import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { useScrollChat } from '../../../../../hooks/useScrollChat'
import { ArrowDownIcon } from '../../../../lib/icons/ArrowDownIcon'
import { ChatFormEdit } from '../chat-form/ChatFormEdit'
import './ListOfMessages.css'
import { MessageItem } from './MessageItem'

export function ListOfMessages () {
  const { chatState } = useContext(ChatContext)
  const { chat } = chatState
  const { showScrollButton, handleScrollButtonClick, containerRef } = useScrollChat(chat?.messages)

  return (
    <>
      <section ref={containerRef} className="chat" >
        <div className='bg-chat'></div>
        <ul className="messages-list">
          {chat?.messages?.map((msg, index, arr) => (
            <MessageItem key={msg.id} msg={msg} prevMsg={arr[index - 1]} />
          ))}
        </ul>
      </section>
      <div className='btn-ctn'>
      {showScrollButton &&
        <button
          className='scroll-button'
          onClick={handleScrollButtonClick}
        >
            <ArrowDownIcon />
        </button>
      }
      </div>
      <ChatFormEdit />
    </>
  )
}
