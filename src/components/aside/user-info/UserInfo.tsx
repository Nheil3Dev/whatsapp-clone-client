import { useContext } from 'react'
import { closeProfile } from '../../../actions/asideActions'
import { AsideContext } from '../../../context/asideContext'
import { useCssEffects } from '../../../hooks/useCssEffects'
import { useProfile } from '../../../hooks/useProfile'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { BackArrow } from '../../icons/BackArrow'
import { PencilIcon } from '../../icons/PencilIcon'
import { UpdateData } from './UpdateData'
import './UserInfo.css'

export function UserInfo () {
  const { asideState, dispatch } = useContext(AsideContext)
  const { className, handleClick } = useCssEffects(asideState?.userInfo ?? false, 'visible-profile')
  const {
    data,
    formData,
    activeEmoji,
    changeAlias,
    changeInfo,
    handleVisibleAlias,
    handleVisibleInfo,
    visibleInput,
    handleSubmit,
    handleEmojiAlias,
    handleEmojiInfo,
    handleVisibleEmojiAlias,
    handleVisibleEmojiInfo
  } = useProfile()

  if (!dispatch) return null
  return (
    <section className={className}>

      <header className="profile-info-header">
        <button
          className="icon-button"
          onClick={() => {
            handleClick(() => dispatch(closeProfile))
            if (visibleInput.alias) {
              handleVisibleAlias()
            }
            if (visibleInput.info) {
              handleVisibleInfo()
            }
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
          !visibleInput.alias

            ? <div className='profile-data'>
                <p>{data?.alias}</p>
                <button className='icon-button' onClick={handleVisibleAlias}>
                  <PencilIcon />
                </button>
              </div>

            : <UpdateData
                value={formData.alias}
                handleChange={changeAlias}
                handleClick={handleVisibleAlias}
                handleSubmit={handleSubmit}
                handleEmoji={handleEmojiAlias}
                activeEmoji={activeEmoji.alias}
                handleVisibleEmoji={handleVisibleEmojiAlias}
                maxLength={20}
              />
        }
        <p className='profile-info-p'>
          Este no es tu nombre de usuario o PIN. Este nombre será visible para tus contactos de Whatsapp Clone.
        </p>
        <p className="profile-info-label">
          Info.
        </p>
        {
          !visibleInput.info

            ? <div className='profile-data'>
                <p>{data?.info}</p>
                <button className='icon-button' onClick={handleVisibleInfo}>
                  <PencilIcon />
                </button>
              </div>

            : <UpdateData
                value={formData.info}
                handleChange={changeInfo}
                handleClick={handleVisibleInfo}
                handleSubmit={handleSubmit}
                handleEmoji={handleEmojiInfo}
                activeEmoji={activeEmoji.info}
                handleVisibleEmoji={handleVisibleEmojiInfo}
                maxLength={60}
              />
        }
      </article>
    </section>
  )
}
