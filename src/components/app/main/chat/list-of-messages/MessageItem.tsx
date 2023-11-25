import { useContext } from 'react'
import { ChatContext } from '../../../../../context/chatContext'
import { UserContext } from '../../../../../context/userContext'
import { useDropdown } from '../../../../../hooks/useDropDown'
import { IMessage } from '../../../../../types/types'
import { getLocalTime } from '../../../../../utils/getLocalTime'
import { UserDefaultAvatar } from '../../../../lib/defaults-avatars/UserDefaultAvatar'
import { Dropdown } from '../../../../lib/dialog/Dropdown'
import { ArrowDownIcon } from '../../../../lib/icons/ArrowDownIcon'
import { EmojiIcon } from '../../../../lib/icons/EmojiIcon'
import { MessageDropdown } from './MessageDropdown'
import './MessageItem.css'
import { MsgDate } from './MsgDate'

interface MessageProps {
  msg: IMessage
  prevMsg: IMessage
}

export function MessageItem ({ msg, prevMsg }: MessageProps) {
  const { user } = useContext(UserContext)
  const { chatState } = useContext(ChatContext)
  const isMyMessage = msg.userId === user?.id
  const isFirstMessage = !prevMsg?.alias || msg.alias !== prevMsg?.alias
  const { dropdownOpened, dropdownRef, buttonRef, toggleDropdown, closeDropdown } = useDropdown()

  const className = isMyMessage
    ? isFirstMessage
      ? 'message myself'
      : 'message myself same-user'
    : isFirstMessage
      ? 'message'
      : 'message same-user'

  // TODO: Arreglar para traernos las fotos de los usuarios (en el caso que introduzcamos esto)

  return (
    <li id={String(msg?.id)} className='msg-li'>
      <MsgDate key={`date${msg.id}`} date={msg.date} prevDate={prevMsg?.date} />
      <div className={className}>
        {!isMyMessage && isFirstMessage && chatState.chat.admin && (
          <>
            <span className='msg-item-img'><UserDefaultAvatar /></span>
            <small>{msg.alias}</small>
          </>
        )}
        <p>{msg.content}</p>
        <span>{getLocalTime(msg.date)}</span>
        <div className='dropdown-container'>
          <button ref={buttonRef} className='icon-button' onClick={toggleDropdown}>
            <ArrowDownIcon />
          </button>
          {
            dropdownOpened &&
            <Dropdown ref={dropdownRef}>
              <MessageDropdown msg={msg} isMyMessage={isMyMessage} closeDropdown={closeDropdown} />
            </Dropdown>
        }
        </div>
        <div className='emoji-button-container'>
          <button className='emoji-button'>
            <EmojiIcon />
          </button>
        </div>

      </div>
    </li>
  )
}
