import { useContext } from 'react'
import { AsideContext } from '../../../context/asideContext'
import { UserDefaultAvatar } from '../../defaults-avatars/UserDefaultAvatar'
import { BackArrow } from '../../icons/BackArrow'
import './UserInfo.css'

export function UserInfo () {
  const { isVisible, closeUserInfo } = useContext(AsideContext)
  return (
    <section
      className={
        isVisible?.userInfo ? 'secondary-aside visible-profile' : 'secondary-aside'
      }
    >
      <header className="profile-info-header">
        <button
          className="icon-button"
          onClick={closeUserInfo}
        >
          <BackArrow />
        </button>
        <h3>Perfil</h3>
      </header>
      <article className="profle-info-container">
        <span className='profile-info-img'><UserDefaultAvatar /></span>
        <p className="profile-info-label">Tu nombre</p>
        <p>Claudio López</p>
        <p className="profile-info-label">Info.</p>
        <p>Yo tampoco sé vivir estoy improvisando ✌️</p>
      </article>
    </section>
  )
}
