import { IChat } from '../../../types/types'
import { GroupDefaultAvatar } from '../defaults-avatars/GroupDefaultAvatar'
import { UserDefaultAvatar } from '../defaults-avatars/UserDefaultAvatar'

interface ImageProps {
  className: string
  chat: IChat
  isHeader?: boolean
}

export function ChatImg ({ className, chat, isHeader = false }: ImageProps) {
  return (
    <>
      {
          chat?.admin
            ? chat?.img
              ? <img
              className={className}
              src={chat?.img}
              alt="Imagen del grupo"
              title={isHeader ? 'Detalles del perfil' : ''}
              />
              : <span className={className}><GroupDefaultAvatar /></span>
            : <span className={className}><UserDefaultAvatar /></span>
        }
    </>
  )
}
