import { useContext } from 'react'
import { AsideContext } from '../../../context/asideContext'
import { useUser } from '../../../hooks/useUser'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { BackArrow } from '../../icons/BackArrow'
import { PencilIcon } from '../../icons/PencilIcon'
import { UpdateData } from './UpdateData'
import './UserInfo.css'

export function UserInfo () {
  const { isVisible, closeUserInfo } = useContext(AsideContext)
  const {
    className,
    data,
    formData,
    onChangeAlias,
    onChangeInfo,
    handleVisibleAlias,
    handleVisibleInfo,
    visibleInput,
    handleSubmit
  } = useUser(isVisible?.userInfo ?? false)
  return (
    <section className={className}>
      <header className="profile-info-header">
        <button className="icon-button" onClick={closeUserInfo}>
          <BackArrow />
        </button>
        <h3>Perfil</h3>
      </header>
      <article className="profle-info-container">
        <span className='profile-info-img'><UserDefaultAvatar /></span>
        <p className="profile-info-label">Tu nombre</p>
        {
          !visibleInput.alias
            ? <div className='profile-data'>
                <p>{data?.alias}</p>
                <button className='icon-button' onClick={handleVisibleAlias}>
                  <PencilIcon />
                </button>
              </div>
            : <UpdateData value={formData.alias} handleChange={onChangeAlias} handleClick={handleVisibleAlias} handleSubmit={handleSubmit}/>
        }
        <p className='profile-info-p'>Este no es tu nombre de usuario o PIN. Este nombre será visible para tus contactos de Whatsapp Clone.</p>
        <p className="profile-info-label">Info.</p>
        {
          !visibleInput.info
            ? <div className='profile-data'>
                <p>{data?.info}</p>
                <button className='icon-button' onClick={handleVisibleInfo}>
                  <PencilIcon />
                </button>
              </div>
            : <UpdateData value={formData.info} handleChange={onChangeInfo} handleClick={handleVisibleInfo} handleSubmit={handleSubmit} />
        }
      </article>
    </section>
  )
}
