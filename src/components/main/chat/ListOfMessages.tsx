// import { useEffect, useRef, useState } from 'react'
import { useScrollChat } from '../../../hooks/useScrollChat'
import { IMessage } from '../../../types/types'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import './ListOfMessages.css'
import { MessageItem } from './MessageItem'

interface ListOfMessagesProps {
  messages: IMessage[];
  infoActive: boolean
}

export function ListOfMessages ({ messages, infoActive }: ListOfMessagesProps) {
  const classNameImg = `bg-chat ${infoActive ? 'info-active' : ''}`
  const { showScrollButton, handleScrollButtonClick, containerRef } = useScrollChat(messages)
  return (
    <>
      <section ref={containerRef} className="chat" >
        <div className={classNameImg}></div>
        <ul className="messages-list">
          {messages.map((msg, index, arr) => (
            <MessageItem key={msg.id} msg={msg} prevUser={arr[index - 1]?.user} />
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
    </>
  )
}
