import { useContext, useEffect } from 'react'
import { closeProfile } from '../../../../actions/asideActions'
import { closeInputs, initUserInfo } from '../../../../actions/userInfoActions'
import { USER } from '../../../../constants/user'
import { AsideContext } from '../../../../context/asideContext'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { useCssEffects } from '../../../../hooks/useCssEffects'
import { getProfileData } from '../../../../services/getProfileData'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { UserData } from './UserData'
import './UserInfo.css'

export function UserInfo () {
  const { asideState, dispatch } = useContext(AsideContext)
  const { dispatchUserInfo } = useContext(UserInfoContext)
  const { className, handleClick } = useCssEffects(asideState?.userInfo, 'visible-profile')

  useEffect(() => {
    getProfileData(USER.id)
      .then(data => {
        dispatchUserInfo && dispatchUserInfo(initUserInfo(data))
      })
  }, [])

  return (
    <section className={className}>

      <header className="profile-info-header">
        <button
          className="icon-button"
          onClick={() => {
            handleClick(() => dispatch(closeProfile))
            dispatchUserInfo(closeInputs)
          }}
        >
          <BackArrow />
        </button>
        <h3>Perfil</h3>
      </header>

      <article className="profle-info-container">
        <span className='profile-info-img'>
          <UserDefaultAvatar />
        </span>
        <p className="profile-info-label">Tu nombre</p>
        <UserData type='alias' />
        <p className='profile-info-p'>
          Este no es tu nombre de usuario o PIN. Este nombre será visible para tus contactos de Whatsapp Clone.
        </p>
        <p className="profile-info-label">
          Info.
        </p>
        <UserData type='info' />
      </article>
    </section>
  )
}
