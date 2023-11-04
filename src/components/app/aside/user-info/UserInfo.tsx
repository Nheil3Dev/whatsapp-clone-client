import { useContext } from 'react'
import { closeProfile } from '../../../../actions/asideActions'
import { closeInputs, toggleInputAlias, toggleInputInfo } from '../../../../actions/userInfoActions'
import { AsideContext } from '../../../../context/asideContext'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { useCssEffects } from '../../../../hooks/useCssEffects'
import { useProfile } from '../../../../hooks/useProfile'
import { UserDefaultAvatar } from '../../../lib/defaults-avatars/UserDefaultAvatar'
import { BackArrow } from '../../../lib/icons/BackArrow'
import { PencilIcon } from '../../../lib/icons/PencilIcon'
import { UpdateData } from './UpdateData'
import './UserInfo.css'

export function UserInfo () {
  const { asideState, dispatch } = useContext(AsideContext)
  const { userInfoState, dispatchUserInfo } = useContext(UserInfoContext)
  const { className, handleClick } = useCssEffects(asideState?.userInfo ?? false, 'visible-profile')
  const { handleSubmit } = useProfile(userInfoState, dispatchUserInfo)

  if (!dispatch || !dispatchUserInfo) return null
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
        {
          !userInfoState?.visibleInput.alias

            ? <div className='profile-data'>
                <p>{userInfoState?.data?.alias}</p>
                <button className='icon-button' onClick={() => dispatchUserInfo(toggleInputAlias)}>
                  <PencilIcon />
                </button>
              </div>

            : <UpdateData
                handleSubmit={handleSubmit}
                maxLength={20}
                type='alias'
              />
        }
        <p className='profile-info-p'>
          Este no es tu nombre de usuario o PIN. Este nombre será visible para tus contactos de Whatsapp Clone.
        </p>
        <p className="profile-info-label">
          Info.
        </p>
        {
          !userInfoState?.visibleInput.info

            ? <div className='profile-data'>
                <p>{userInfoState?.data?.info}</p>
                <button className='icon-button' onClick={() => dispatchUserInfo(toggleInputInfo)}>
                  <PencilIcon />
                </button>
              </div>

            : <UpdateData
                handleSubmit={handleSubmit}
                maxLength={60}
                type='info'
              />
        }
      </article>
    </section>
  )
}
