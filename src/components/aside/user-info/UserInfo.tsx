import { BackArrow } from '../../icons/BackArrow'
import './UserInfo.css'

interface UserInfoProps {
    visibleProfile: boolean
    setVisibleProfile: (prop: boolean) => void
}

export function UserInfo ({ visibleProfile, setVisibleProfile }: UserInfoProps) {
  return (
        <section className={visibleProfile ? 'secondary-aside visible-profile' : 'secondary-aside'}>
        <header className='profile-info-header'>
          <button className='icon-button' onClick={() => setVisibleProfile(false)}>
            <BackArrow />
          </button>
          <h3>Perfil</h3>
        </header>
        <article className='profle-info-container'>
          <img src="random-img.jpg" alt="Foto de perfil del usuario" />
          <p className='profile-info-label'>Tu nombre</p>
          <p>Claudio López</p>
          <p className='profile-info-label'>Info.</p>
          <p>Yo tampoco sé vivir estoy improvisando ✌️</p>
        </article>
      </section>
  )
}
