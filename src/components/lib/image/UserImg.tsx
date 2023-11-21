import { IUser, IUserMin } from '../../../types/types'
import { UserDefaultAvatar } from '../defaults-avatars/UserDefaultAvatar'

interface UserImgProps {
  className: string
  user: IUser | IUserMin
}

export function UserImg ({ className, user }: UserImgProps) {
  return (
    <>
      { // TODO: Añadir rutas con imagenes a los usuarios
      user?.img
        ? <img src={user?.img} alt={`Foto de ${user.alias}`} />
        : <span className={className}>
        <UserDefaultAvatar />
      </span>
      }
    </>
  )
}
