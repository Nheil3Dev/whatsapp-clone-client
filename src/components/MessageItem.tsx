import { type IMessage } from '../types/types'

interface MessageProps {
  msg: IMessage
  prevUser: string
}

export function MessageItem ({ msg, prevUser }: MessageProps) {
  const isMyMessage = msg.user === 'Claudio'
  const isFirstMessage = !prevUser || msg.user !== prevUser

  const className = isMyMessage
    ? isFirstMessage
      ? 'message myself'
      : 'message myself same-user'
    : isFirstMessage
      ? 'message'
      : 'message same-user'

  return (
    <li className={className}>
      {!isMyMessage && isFirstMessage && (
        <>
          <img src="random-img.jpg" alt="user image" />
          <small>{msg.user}</small>
        </>
      )}
      <p>{msg.content}</p>
      <span>10:10</span>
    </li>
  )
}
