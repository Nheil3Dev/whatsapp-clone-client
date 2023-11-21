import { useContext, useEffect } from 'react'
import { closeProfile } from '../../../../actions/asideActions'
import { closeInputs, initUserInfo } from '../../../../actions/userInfoActions'
import { AsideContext } from '../../../../context/asideContext'
import { UserContext } from '../../../../context/userContext'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { useCssEffects } from '../../../../hooks/useCssEffects'
import { getProfileData } from '../../../../services/getProfileData'
import { IUserMin } from '../../../../types/types'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { UserImg } from '../../../lib/image/UserImg'
import { UserData } from './UserData'
import './UserInfo.css'

export function UserInfo () {
  const { user } = useContext(UserContext)
  const { asideState, dispatch } = useContext(AsideContext)
  const { dispatchUserInfo } = useContext(UserInfoContext)
  const { className, handleClick } = useCssEffects(asideState?.userInfo, 'visible-profile')

  useEffect(() => {
    if (!user) return
    getProfileData(user.id)
      .then(data => {
        dispatchUserInfo && dispatchUserInfo(initUserInfo(data))
      })
  }, [user])

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
        <UserImg className='profile-info-img' user={user ?? {} as IUserMin} />
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
